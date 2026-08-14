const express = require("express");
const { pool } = require("../config/db");
const { authenticateToken, authorizeRole } = require("./auth");

const router = express.Router();

router.use(authenticateToken, authorizeRole(["admin"]));

router.get("/verifications", async (req, res) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status.trim().toLowerCase() : "pending";

    if (!["pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid verification status" });
    }

    const result = await pool.query(
      `SELECT id, full_name, username, email, college_id, id_card_url, verification_status, created_at
       FROM users
       WHERE verification_status = $1
       ORDER BY created_at DESC`,
      [status]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get verification queue error:", error);
    return res.status(500).json({ error: "Failed to fetch verification requests" });
  }
});

router.patch("/verifications/:userId/approve", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `UPDATE users
       SET verification_status = 'verified', updated_at = NOW()
       WHERE id = $1
       RETURNING id, full_name, username, email, verification_status, updated_at`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "User approved",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Approve user error:", error);
    return res.status(500).json({ error: "Failed to approve user" });
  }
});

router.patch("/verifications/:userId/reject", async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body || {};

    const result = await pool.query(
      `UPDATE users
       SET verification_status = 'rejected', updated_at = NOW()
       WHERE id = $1
       RETURNING id, full_name, username, email, verification_status, updated_at`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "User rejected",
      reason: reason || null,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Reject user error:", error);
    return res.status(500).json({ error: "Failed to reject user" });
  }
});

module.exports = router;
