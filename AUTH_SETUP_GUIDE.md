# Authentication & Database Setup Guide

## Overview
The login/register system is now fully integrated with a MySQL backend. Here's how to complete the setup.

## Prerequisites
You need **MySQL** installed and running locally on your machine.

### Option 1: Install MySQL Locally (Recommended for Development)

#### Windows:
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Run the installer and follow the setup wizard
3. Choose "MySQL Server 8.0" or later
4. Default port: `3306`
5. Set root password (remember this!)
6. During installation, choose "MySQL Server as Windows Service" option
7. After installation, open Command Prompt as Administrator and verify:
   ```bash
   mysql --version
   mysql -u root -p
   ```

#### macOS:
```bash
# Using Homebrew (recommended)
brew install mysql
brew services start mysql
mysql -u root -p
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo systemctl start mysql
mysql -u root -p
```

### Option 2: Docker (Easiest Alternative)
If you have Docker installed, run:
```bash
docker run --name biteverse-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your_password -d mysql:8
```

## Configuration

### 1. Update .env file
Edit `backend-node/.env`:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_root_password
MYSQL_DATABASE=biteverse_db
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### 2. Create Database & Tables
From the `backend-node` directory, run:
```bash
node setup-db.js
```

This will:
- Create the `biteverse_db` database
- Create required tables: `users`, `reviews`, `rewards`, `leaderboard`

Expected output:
```
Creating database: biteverse_db
✓ Database created or already exists
✓ Users table created or already exists
✓ Reviews table created or already exists
✓ Rewards table created or already exists
✓ Leaderboard table created or already exists

✓ Database setup completed successfully!
Database: biteverse_db
Tables: users, reviews, rewards, leaderboard
```

## Features

### Login Options

#### 1. Password Login
- **Identifier**: Username or Email
- **Password**: Must be 8+ characters with number and special character
- **Example**:
  - Username: `alexchef` + Password
  - Email: `alex@example.com` + Password

#### 2. OTP Login
- **Phone Number**: International format supported
- **OTP**: 6-digit code (valid for 5 minutes)
- **Process**:
  1. Enter phone number
  2. Click "Send OTP"
  3. (In development, OTP appears in browser console and terminal)
  4. Enter OTP and click "Verify & Log In"

### Registration
Users can sign up with:
- Username (3-20 characters, alphanumeric + _ .)
- Email address (validated)
- Phone number (optional)
- Password (8+ chars, number, special char)
- Full name
- Date of birth
- College/Institution
- Role (Student/Teacher)
- Profile picture (auto-generated or custom)

After registration, users are automatically logged in and redirected to the dashboard.

## Testing

### Create a Test Account
1. Go to http://localhost:5173/register
2. Fill in the form:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `Test@1234`
   - Phone: `+919876543210`
   - Full Name: `Test User`
   - Date of Birth: `2000-01-15`
   - College: Select from dropdown
   - Role: Student

3. Click "Create Account"
4. You should be logged in and redirected to dashboard

### Test OTP Login
1. Go to http://localhost:5173/login
2. Click "OTP" tab
3. Enter phone: `+919876543210`
4. Click "Send OTP"
5. Check browser console or terminal for OTP
6. Enter OTP and click "Verify & Log In"

## Database Schema

### Users Table
```sql
- id (INT, Primary Key)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- phone (VARCHAR)
- password_hash (VARCHAR)
- full_name (VARCHAR)
- dob (DATE)
- college (VARCHAR)
- role (ENUM: student, teacher, chef)
- avatar (VARCHAR)
- auth_method (ENUM: password, otp)
- xp (INT, default 0)
- level (INT, default 1)
- streak (INT, default 0)
- verified (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Reviews Table
```sql
- id (INT, Primary Key)
- user_id (INT, Foreign Key)
- stall_name (VARCHAR)
- dish_name (VARCHAR)
- rating (INT, 1-5)
- comment (TEXT)
- image_url (VARCHAR)
- likes (INT)
- replies (INT)
- created_at (TIMESTAMP)
```

### Rewards Table
```sql
- id (INT, Primary Key)
- user_id (INT, Foreign Key)
- reward_name (VARCHAR)
- points_earned (INT)
- description (TEXT)
- redeemed (BOOLEAN)
- created_at (TIMESTAMP)
```

### Leaderboard Table
```sql
- id (INT, Primary Key)
- user_id (INT, Foreign Key, UNIQUE)
- rank (INT)
- xp (INT)
- weekly_xp (INT)
- monthly_xp (INT)
- reviews_count (INT)
- updated_at (TIMESTAMP)
```

## API Endpoints

### Authentication Routes

#### 1. Register
```
POST /api/auth/register
Body: {
  username: string,
  email: string,
  phone: string (optional),
  password: string,
  fullName: string,
  dob: string (YYYY-MM-DD),
  college: string,
  role: "student" | "teacher",
  avatar: string (URL)
}
Response: { token, userId, username }
```

#### 2. Login (Password)
```
POST /api/auth/login
Body: {
  username?: string,
  email?: string,
  password: string
}
Response: { token, userId, username }
```

#### 3. Request OTP
```
POST /api/auth/request-otp
Body: { phone: string } or { email: string }
Response: { message, identifier, dev_otp }
```

#### 4. Verify OTP
```
POST /api/auth/verify-otp
Body: { identifier: string, otp: string }
Response: { token, userId, username }
```

## Troubleshooting

### "MySQL connection refused"
- Ensure MySQL is running
- Check MySQL host, port, user, password in .env
- On Windows: Check Services (services.msc) for MySQL

### "Database already exists"
- The setup script is safe to run multiple times
- It uses `CREATE TABLE IF NOT EXISTS`

### "OTP always expires"
- OTP is valid for 5 minutes by default
- Change `OTP_EXPIRY_MINUTES` in .env if needed

### "Token not generated"
- Ensure `JWT_SECRET` is set in .env
- Check that authentication route is working via API health check

## Security Notes

⚠️ **Important for Production**:
1. Change `JWT_SECRET` to a long random string
2. Set `MYSQL_PASSWORD` to a strong password
3. Use HTTPS (not HTTP)
4. Implement rate limiting (already in place)
5. Add CSRF protection
6. Use environment variables properly (.env files should not be in git)
7. Implement email verification for new accounts
8. Add password reset functionality

## Next Steps

Once this is set up:
1. Test login/register at http://localhost:5173/
2. Verify data in MySQL database:
   ```sql
   USE biteverse_db;
   SELECT * FROM users;
   ```
3. Implement additional features:
   - Email verification
   - Password reset
   - Social login (Google, Microsoft)
   - User profile completion
   - XP and rewards system
