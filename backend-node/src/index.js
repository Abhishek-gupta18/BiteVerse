require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { pool } = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const collegeRoutes = require("./routes/colleges");
const stallRoutes = require("./routes/stalls");
const foodItemRoutes = require("./routes/food-items");
const reviewRoutes = require("./routes/reviews");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    if (result && result.rows) {
      return res.json({ status: "ok", db: "connected" });
    }
    return res.status(500).json({ message: "Database check returned no rows" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/stalls", stallRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Keep startup log simple for local development.
  console.log(`Node API running on port ${PORT}`);
});
