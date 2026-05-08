#!/usr/bin/env node

/**
 * SQLite Alternative Setup
 * Run this instead of setup-db.js if you don't have MySQL installed
 * Usage: node setup-db-sqlite.js
 */

const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'biteverse.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log(`✓ SQLite database initialized at ${dbPath}`);
});

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      password_hash TEXT,
      full_name TEXT,
      dob TEXT,
      college TEXT,
      role TEXT DEFAULT 'student',
      avatar TEXT,
      auth_method TEXT DEFAULT 'password',
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak INTEGER DEFAULT 0,
      verified INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('✓ Users table created');
  });

  // Create reviews table
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      stall_name TEXT,
      dish_name TEXT,
      rating INTEGER,
      comment TEXT,
      image_url TEXT,
      likes INTEGER DEFAULT 0,
      replies INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating reviews table:', err);
    else console.log('✓ Reviews table created');
  });

  // Create rewards table
  db.run(`
    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reward_name TEXT,
      points_earned INTEGER,
      description TEXT,
      redeemed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating rewards table:', err);
    else console.log('✓ Rewards table created');
  });

  // Create leaderboard table
  db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      rank INTEGER,
      xp INTEGER DEFAULT 0,
      weekly_xp INTEGER DEFAULT 0,
      monthly_xp INTEGER DEFAULT 0,
      reviews_count INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating leaderboard table:', err);
    else console.log('✓ Leaderboard table created');
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
    process.exit(1);
  }
  console.log('\n✓ SQLite database setup completed successfully!');
  console.log(`Database location: ${dbPath}`);
  console.log('\nNote: To use SQLite instead of MySQL, update the auth routes to use sqlite3 library');
  console.log('See SQLITE_SETUP.md for more information');
});
