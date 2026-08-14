const express = require("express");
const { pool } = require("../config/db");
const { authenticateToken, requireVerified } = require("./auth");

const router = express.Router();

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

router.post("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { food_id, rating, review_text, image_url } = req.body;

    if (!food_id) {
      return res.status(400).json({ error: "food_id is required" });
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ error: "rating must be an integer between 1 and 5" });
    }

    const result = await pool.query(
      `INSERT INTO reviews (food_id, user_id, rating, review_text, image_url, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [food_id, req.user.id, numericRating, review_text || null, image_url || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create review error:", error);
    return res.status(500).json({ error: "Failed to create review" });
  }
});

router.get("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { food_id, limit, offset } = req.query;

    if (!food_id) {
      return res.status(400).json({ error: "food_id query parameter is required" });
    }

    const limitValue = parsePositiveInteger(limit, 20);
    const offsetValue = parsePositiveInteger(offset, 0);

    const query = `
      SELECT r.*,
             u.username,
             u.profile_picture_url
      FROM reviews r
      INNER JOIN users u ON u.id = r.user_id
      WHERE r.food_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [food_id, limitValue, offsetValue]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Get reviews error:", error);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

router.patch("/:id", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const review = existing.rows[0];
    const canEdit = req.user.id === review.user_id || req.user.role === "admin";

    if (!canEdit) {
      return res.status(403).json({ error: "Access denied" });
    }

    const allowedFields = ["rating", "review_text", "image_url"];
    const updates = [];
    const values = [];
    let idx = 1;

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        const value = req.body[field];
        if (field === "rating") {
          const numericRating = Number(value);
          if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ error: "rating must be an integer between 1 and 5" });
          }
        }

        updates.push(`${field} = $${idx}`);
        values.push(value === undefined || value === null ? null : value);
        idx += 1;
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    values.push(id);
    const query = `
      UPDATE reviews
      SET ${updates.join(", ")}
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update review error:", error);
    return res.status(500).json({ error: "Failed to update review" });
  }
});

router.delete("/:id", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const review = existing.rows[0];
    const canDelete = req.user.id === review.user_id || req.user.role === "admin";

    if (!canDelete) {
      return res.status(403).json({ error: "Access denied" });
    }

    await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    return res.status(500).json({ error: "Failed to delete review" });
  }
});

module.exports = router;
