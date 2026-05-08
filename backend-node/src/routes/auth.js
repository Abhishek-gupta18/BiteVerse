const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { pool } = require("../config/db");

const router = express.Router();

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Email transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your_email@gmail.com",
    pass: process.env.EMAIL_PASS || "your_app_password",
  },
});

// Helper to generate JWT
const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
};

// Helper to validate email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Helper to validate phone
const isValidPhone = (phone) => /^[0-9]{7,15}$/.test(phone.replace(/\D/g, ""));

// REQUEST OTP endpoint
router.post("/request-otp", async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({
        error: "Phone number or email is required",
      });
    }

    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({
        error: "Invalid phone number format",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    const identifier = phone || email;

    otpStore.set(identifier, { otp, expiryTime });

    // In production, send OTP via email or SMS
    console.log(`OTP for ${identifier}: ${otp}`);

    res.json({
      message: "OTP sent successfully",
      identifier,
      // For development only - remove in production
      dev_otp: otp,
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ error: "Failed to request OTP" });
  }
});

// VERIFY OTP & LOGIN endpoint
router.post("/verify-otp", async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        error: "Identifier and OTP are required",
      });
    }

    const storedData = otpStore.get(identifier);

    if (!storedData) {
      return res.status(400).json({
        error: "OTP not found or expired",
      });
    }

    if (storedData.expiryTime < Date.now()) {
      otpStore.delete(identifier);
      return res.status(400).json({
        error: "OTP has expired",
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        error: "Invalid OTP",
      });
    }

    // Clean up used OTP
    otpStore.delete(identifier);

    // Find or create user
    const connection = await pool.getConnection();
    try {
      const isPhone = isValidPhone(identifier);
      const column = isPhone ? "phone" : "email";

      // Check if user exists
      const [users] = await connection.query(
        `SELECT id, username FROM users WHERE ${column} = ?`,
        [identifier]
      );

      let userId, username;

      if (users.length > 0) {
        // Existing user
        userId = users[0].id;
        username = users[0].username;
      } else {
        // New user - create with OTP
        const newUsername = `user_${Date.now()}`;
        const insertResult = await connection.query(
          `INSERT INTO users (username, ${column}, auth_method, created_at) VALUES (?, ?, 'otp', NOW())`,
          [newUsername, identifier]
        );
        userId = insertResult[0].insertId;
        username = newUsername;
      }

      const token = generateToken(userId, username);

      res.json({
        message: "Login successful",
        token,
        userId,
        username,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// REGISTER endpoint
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      fullName,
      dob,
      college,
      role,
      avatar,
    } = req.body;

    // Validation
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        error: "Username, email, password, and full name are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({
        error: "Invalid phone format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }

    const connection = await pool.getConnection();
    try {
      // Check if username or email exists
      const [existing] = await connection.query(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        [username, email]
      );

      if (existing.length > 0) {
        return res.status(400).json({
          error: "Username or email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Insert user
      const result = await connection.query(
        `INSERT INTO users (username, email, phone, password_hash, full_name, dob, college, role, avatar, auth_method, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'password', NOW())`,
        [
          username,
          email,
          phone || null,
          hashedPassword,
          fullName,
          dob || null,
          college || null,
          role || "student",
          avatar || null,
        ]
      );

      const userId = result[0].insertId;
      const token = generateToken(userId, username);

      res.json({
        message: "Registration successful",
        token,
        userId,
        username,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN endpoint (password-based)
router.post("/login", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const identifier = username || email;

    if (!identifier || !password) {
      return res.status(400).json({
        error: "Username/email and password are required",
      });
    }

    const connection = await pool.getConnection();
    try {
      const isEmail = identifier.includes("@");
      const column = isEmail ? "email" : "username";

      const [users] = await connection.query(
        `SELECT id, username, password_hash FROM users WHERE ${column} = ?`,
        [identifier]
      );

      if (users.length === 0) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const user = users[0];

      if (!user.password_hash) {
        return res.status(401).json({
          error: "User registered with OTP. Use OTP login instead",
        });
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      const token = generateToken(user.id, user.username);

      res.json({
        message: "Login successful",
        token,
        userId: user.id,
        username: user.username,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
