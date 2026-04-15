require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { checkDbConnection } = require("./config/db");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", async (req, res) => {
  try {
    await checkDbConnection();
    res.json({
      status: "ok",
      service: "node-backend",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      service: "node-backend",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.post("/api/auth/request-otp", (req, res) => {
  res.json({ message: "OTP module installed. Implement persistence/email provider next." });
});

app.post("/api/auth/verify-otp", (req, res) => {
  res.json({ message: "JWT module installed. Implement OTP verification and JWT issuance next." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Keep startup log simple for local development.
  console.log(`Node API running on port ${PORT}`);
});
