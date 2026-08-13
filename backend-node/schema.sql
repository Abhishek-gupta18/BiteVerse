-- The BiteVerse schema centers on a college-to-user-to-stall-to-food-item flow: each college can host many users and stalls, each user may belong to one college, each stall belongs to one college and is created by a user, each food item belongs to one stall, and each review links a user to a specific food item. This design keeps the platform relational while supporting campus-level discovery, stall management, and food ratings without duplicating stall-level score data.

CREATE TABLE colleges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    type VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
    college_id INTEGER REFERENCES colleges(id) ON DELETE SET NULL,
    profile_picture_url TEXT,
    xp_points INTEGER DEFAULT 0,
    verification_status VARCHAR(20) NOT NULL CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stalls (
    id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    food_court VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    image_url TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    stall_id INTEGER NOT NULL REFERENCES stalls(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    cuisine VARCHAR(100),
    price NUMERIC(8,2) NOT NULL,
    image_url TEXT,
    description TEXT,
    season_tag VARCHAR(20) CHECK (season_tag IN ('winter', 'summer', 'monsoon', 'all_season')) DEFAULT 'all_season',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    food_id INTEGER NOT NULL REFERENCES food_items(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_college_id
    ON users (college_id);

CREATE INDEX idx_stalls_college_id
    ON stalls (college_id);

CREATE INDEX idx_stalls_created_by
    ON stalls (created_by);

CREATE INDEX idx_food_items_stall_id
    ON food_items (stall_id);

CREATE INDEX idx_reviews_user_id
    ON reviews (user_id);

CREATE INDEX idx_reviews_food_id
    ON reviews (food_id);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER stalls_set_updated_at
BEFORE UPDATE ON stalls
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER food_items_set_updated_at
BEFORE UPDATE ON food_items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
