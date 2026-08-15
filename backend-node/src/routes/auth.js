const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { pool } = require("../config/db");

const router = express.Router();
const isDevAuthBypassEnabled = process.env.NODE_ENV !== "production" && process.env.DEV_AUTH_BYPASS !== "false";

if (isDevAuthBypassEnabled) {
  console.warn("[auth] DEV_AUTH_BYPASS is enabled. Authentication and verification checks are bypassed.");
}

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

const getJwtMaxAge = () => {
  const rawValue = process.env.JWT_EXPIRES_IN || "7d";
  const match = rawValue.trim().match(/^(\d+)([smhd])$/i);

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
      return amount * 1000;
    case "m":
      return amount * 60 * 1000;
    case "h":
      return amount * 60 * 60 * 1000;
    case "d":
      return amount * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
};

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("biteverse_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: getJwtMaxAge(),
  });
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

const resolveDevBypassUser = async () => {
  try {
    const existingUser = await pool.query(
      `SELECT id, full_name, username, email, phone, role, college_id, profile_picture_url, id_card_url, xp_points, verification_status, created_at, updated_at
       FROM users
       ORDER BY
         CASE WHEN role = 'admin' THEN 0 ELSE 1 END,
         CASE WHEN verification_status = 'verified' THEN 0 ELSE 1 END,
         id ASC
       LIMIT 1`
    );

    if (existingUser.rows.length > 0) {
      return sanitizeUser(existingUser.rows[0]);
    }

    const devEmail = "dev.bypass@biteverse.local";
    const devUsername = "dev_bypass_user";
    const devPasswordHash = await bcryptjs.hash("dev_bypass_password", 10);

    try {
      const inserted = await pool.query(
        `INSERT INTO users (
          full_name,
          username,
          email,
          phone,
          password_hash,
          role,
          verification_status,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING id, full_name, username, email, phone, role, college_id, profile_picture_url, id_card_url, xp_points, verification_status, created_at, updated_at`,
        ["Developer Bypass", devUsername, devEmail, null, devPasswordHash, "admin", "verified"]
      );

      return sanitizeUser(inserted.rows[0]);
    } catch (insertError) {
      const fallbackUser = await pool.query(
        `SELECT id, full_name, username, email, phone, role, college_id, profile_picture_url, id_card_url, xp_points, verification_status, created_at, updated_at
         FROM users
         WHERE email = $1 OR username = $2
         LIMIT 1`,
        [devEmail, devUsername]
      );

      if (fallbackUser.rows.length > 0) {
        return sanitizeUser(fallbackUser.rows[0]);
      }

      throw insertError;
    }
  } catch (error) {
    return {
      id: 1,
      full_name: "Developer Bypass",
      username: "dev_bypass_user",
      email: "dev.bypass@biteverse.local",
      phone: null,
      role: "admin",
      college_id: null,
      profile_picture_url: null,
      id_card_url: null,
      xp_points: 0,
      verification_status: "verified",
    };
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "biteverse/id-cards",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1600, height: 1600, crop: "limit" }],
  },
});

const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file || !file.mimetype || !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    return cb(null, true);
  },
});

// Helper to generate JWT
const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const authenticateToken = async (req, res, next) => {
  if (isDevAuthBypassEnabled) {
    req.user = await resolveDevBypassUser();
    return next();
  }

  const token = req.cookies?.biteverse_token;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = sanitizeUser(result.rows[0]);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const authenticateTokenOptional = async (req, res, next) => {
  if (isDevAuthBypassEnabled) {
    req.user = await resolveDevBypassUser();
    return next();
  }

  const token = req.cookies?.biteverse_token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);

    req.user = result.rows.length > 0 ? sanitizeUser(result.rows[0]) : null;
    return next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

const authorizeRole = (allowedRoles = []) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (isDevAuthBypassEnabled) {
      return next();
    }

    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    return next();
  };
};

const requireVerified = (req, res, next) => {
  if (isDevAuthBypassEnabled) {
    return next();
  }

  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.verification_status !== "verified") {
    return res.status(403).json({
      error: "verification_pending",
      message: "Your account is pending admin approval",
    });
  }

  return next();
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

    const expiryTime = Date.now() + 5 * 60 * 1000;
    const identifier = phone || email;

    otpStore.set(identifier, { otp, expiryTime });
    console.log(`OTP for ${identifier}: ${otp}`);

    res.json({
      message: "OTP sent successfully",
      identifier,
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
      return res.status(400).json({ error: "Identifier and OTP are required" });
    }

    const storedData = otpStore.get(identifier);

    if (!storedData) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    if (storedData.expiryTime < Date.now()) {
      otpStore.delete(identifier);
      return res.status(400).json({ error: "OTP has expired" });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    otpStore.delete(identifier);

    const isPhone = isValidPhone(identifier);
    const column = isPhone ? "phone" : "email";

    const existingUserResult = await pool.query(
      `SELECT id, username, full_name, email, phone, role, college_id, profile_picture_url, xp_points, verification_status
       FROM users WHERE ${column} = $1`,
      [identifier]
    );

    let user;

    if (existingUserResult.rows.length > 0) {
      user = existingUserResult.rows[0];
    } else {
      const username = `user_${Date.now()}`;
      const fullName = isPhone ? `OTP User ${Date.now()}` : identifier;
      const fallbackEmail = isPhone ? `${username}@biteverse.local` : identifier;
      const fallbackPhone = isPhone ? identifier : null;
      const insertResult = await pool.query(
        `INSERT INTO users (full_name, username, email, phone, password_hash, role, verification_status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, 'student', 'pending', NOW(), NOW())
         RETURNING id, username, full_name, email, phone, role, college_id, profile_picture_url, xp_points, verification_status`,
        [fullName, username, fallbackEmail, fallbackPhone, "otp_placeholder_hash"]
      );

      user = insertResult.rows[0];
    }

    const token = generateToken(user.id, user.username);
    setAuthCookie(res, token);

    return res.json({
      message: "Login successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// REGISTER endpoint
router.post("/register", upload.single("id_card"), async (req, res) => {
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

    if (!req.file) {
      return res.status(400).json({ error: "ID card is required" });
    }

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        error: "Username, email, password, and full name are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ error: "Invalid phone format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const insertResult = await pool.query(
      `INSERT INTO users (
        full_name,
        username,
        email,
        phone,
        password_hash,
        role,
        college_id,
        profile_picture_url,
        id_card_url,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id, full_name, username, email, phone, role, college_id, profile_picture_url, id_card_url, xp_points, verification_status, created_at, updated_at`,
      [
        fullName,
        username,
        email,
        phone || null,
        hashedPassword,
        role || "student",
        college || null,
        avatar || null,
        req.file?.secure_url || req.file?.path || null,
      ]
    );

    const user = insertResult.rows[0];
    const token = generateToken(user.id, user.username);
    setAuthCookie(res, token);

    return res.status(201).json({
      message: "Registration successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error && error.message === "Only image files are allowed") {
      return res.status(400).json({ error: "ID card must be an image file" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN endpoint (password-based)
router.post("/login", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const identifier = username || email;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Username/email and password are required" });
    }

    const isEmail = identifier.includes("@");
    const queryColumn = isEmail ? "email" : "username";

    const result = await pool.query(
      `SELECT * FROM users WHERE ${queryColumn} = $1`,
      [identifier]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    if (!user.password_hash || user.password_hash === "otp_placeholder_hash") {
      return res.status(401).json({ error: "User registered with OTP. Use OTP login instead" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.username);
    setAuthCookie(res, token);

    return res.json({
      message: "Login successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, username, email, phone, role, college_id, profile_picture_url, id_card_url, xp_points, verification_status, created_at, updated_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: sanitizeUser(result.rows[0]) });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ error: "Failed to fetch current user" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("biteverse_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.json({ message: "Logged out successfully" });
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
module.exports.authenticateTokenOptional = authenticateTokenOptional;
module.exports.authorizeRole = authorizeRole;
module.exports.requireVerified = requireVerified;
module.exports.upload = upload;
