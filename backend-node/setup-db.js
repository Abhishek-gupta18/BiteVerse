require("dotenv").config();
const mysql = require("mysql2/promise");

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
  });

  try {
    const dbName = process.env.MYSQL_DATABASE || "biteverse_db";

    console.log(`Creating database: ${dbName}`);

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✓ Database created or already exists`);

    // Select the database
    await connection.query(`USE \`${dbName}\``);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        password_hash VARCHAR(255),
        full_name VARCHAR(100),
        dob DATE,
        college VARCHAR(100),
        role ENUM('student', 'teacher', 'chef') DEFAULT 'student',
        avatar VARCHAR(255),
        auth_method ENUM('password', 'otp') DEFAULT 'password',
        xp INT DEFAULT 0,
        level INT DEFAULT 1,
        streak INT DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_phone (phone),
        INDEX idx_username (username)
      )
    `);
    console.log(`✓ Users table created or already exists`);

    // Create reviews table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        stall_name VARCHAR(100),
        dish_name VARCHAR(100),
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        image_url VARCHAR(255),
        likes INT DEFAULT 0,
        replies INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      )
    `);
    console.log(`✓ Reviews table created or already exists`);

    // Create rewards table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS rewards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        reward_name VARCHAR(100),
        points_earned INT,
        description TEXT,
        redeemed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id)
      )
    `);
    console.log(`✓ Rewards table created or already exists`);

    // Create leaderboard table (for cached data)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        rank INT,
        xp INT DEFAULT 0,
        weekly_xp INT DEFAULT 0,
        monthly_xp INT DEFAULT 0,
        reviews_count INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_rank (rank),
        INDEX idx_xp (xp)
      )
    `);
    console.log(`✓ Leaderboard table created or already exists`);

    console.log("\n✓ Database setup completed successfully!");
    console.log(`Database: ${dbName}`);
    console.log(`Tables: users, reviews, rewards, leaderboard`);
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

setupDatabase();
