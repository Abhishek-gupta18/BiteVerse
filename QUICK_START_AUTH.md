# Quick Start - Get Auth Working in 5 Minutes

## The Fastest Way: Docker

If you have Docker installed, run this ONE command:

```bash
docker run --name biteverse-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root123 -d mysql:8
```

Then run:
```bash
cd backend-node
node setup-db.js
```

**Done!** Your database is ready.

---

## Alternative: Windows MySQL Installation

### 1. Download MySQL (30 seconds)
- Go to: https://dev.mysql.com/downloads/mysql/
- Download "MySQL Community Server 8.0" Windows installer
- Run the installer

### 2. Installation Steps (2 minutes)
- Accept license
- Choose "MySQL Server 8.0" or later
- Click "Next" through configuration
- **IMPORTANT**: Remember the password you set for root user
- Select "Windows Service" during setup
- Finish

### 3. Start MySQL (30 seconds)
Windows Key → Search "Services" → Find "MySQL" → Right-click → Start

Or in Command Prompt (as Administrator):
```bash
net start MySQL80
```

### 4. Initialize Database (10 seconds)
```bash
cd backend-node
node setup-db.js
```

---

## If setup-db.js Fails with Connection Error:

### Check MySQL is Running:
```bash
mysql --version
mysql -u root -p
```

If this fails, MySQL is not installed or not running.

### Update .env with Correct Password:
Edit `backend-node/.env`:
```env
MYSQL_PASSWORD=your_password_you_set
```

Then run setup again:
```bash
node setup-db.js
```

---

## Test It Works

### 1. Open http://localhost:5173

### 2. Go to Register
- Username: `testuser`
- Email: `test@example.com`
- Password: `Test@12345`
- Fill other fields and submit

### 3. Check Database
```bash
mysql -u root -p biteverse_db

# Inside MySQL:
SELECT * FROM users;
```

You should see your registered user!

---

## If You Get Stuck

1. **MySQL not running?**
   - Windows: Check Services (services.msc)
   - Mac: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

2. **Connection refused error?**
   - Is MySQL actually running? (See above)
   - Is the password in .env correct?
   - Is the host/port correct in .env? (Default: localhost:3306)

3. **Table already exists error?**
   - That's OK! It means tables are already created
   - You can skip running setup-db.js again

---

## Troubleshooting Commands

```bash
# Check if MySQL is installed
mysql --version

# Login to MySQL
mysql -u root -p

# Inside MySQL - List databases
SHOW DATABASES;

# Check if biteverse_db exists
SHOW DATABASES LIKE 'biteverse_db';

# Use the database
USE biteverse_db;

# List tables
SHOW TABLES;

# Check users table
DESCRIBE users;
SELECT * FROM users;
```

---

## Once It's Working

1. Register at http://localhost:5173/register
2. You're logged in automatically
3. Go to http://localhost:5173/dashboard
4. Check the data in MySQL: `SELECT * FROM users;`

**That's it!** Your full authentication system is now live.

---

## Production Checklist

When ready for production:

- [ ] Change `JWT_SECRET` in .env to a long random string
- [ ] Set strong `MYSQL_PASSWORD` 
- [ ] Use HTTPS (not HTTP)
- [ ] Move .env to environment variables (don't commit .env to git)
- [ ] Add email verification
- [ ] Add password reset
- [ ] Implement rate limiting (already done)
- [ ] Add SSL to MySQL connection
