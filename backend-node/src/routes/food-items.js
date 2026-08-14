const express = require("express");
const { pool } = require("../config/db");
const { authenticateToken, requireVerified } = require("./auth");

const router = express.Router();

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

router.get("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { stall_id } = req.query;

    if (!stall_id) {
      return res.status(400).json({ error: "stall_id query parameter is required" });
    }

    const query = `
      SELECT fi.*,
             ROUND(COALESCE(AVG(r.rating), 0), 2) AS avg_rating,
             COUNT(r.id) AS review_count
      FROM food_items fi
      LEFT JOIN reviews r ON r.food_id = fi.id
      WHERE fi.stall_id = $1
      GROUP BY fi.id
      ORDER BY fi.created_at DESC
    `;

    const result = await pool.query(query, [stall_id]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Get food items error:", error);
    return res.status(500).json({ error: "Failed to fetch food items" });
  }
});

router.get("/:id", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT fi.*,
             ROUND(COALESCE(AVG(r.rating), 0), 2) AS avg_rating,
             COUNT(r.id) AS review_count
      FROM food_items fi
      LEFT JOIN reviews r ON r.food_id = fi.id
      WHERE fi.id = $1
      GROUP BY fi.id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Food item not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get food item error:", error);
    return res.status(500).json({ error: "Failed to fetch food item" });
  }
});

router.post("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const {
      stall_id,
      name,
      category,
      cuisine,
      price,
      image_url,
      description,
      season_tag,
    } = req.body;

    if (!stall_id || !name || price === undefined) {
      return res.status(400).json({ error: "stall_id, name, and price are required" });
    }

    const result = await pool.query(
      `INSERT INTO food_items (stall_id, name, category, cuisine, price, image_url, description, season_tag, created_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       RETURNING *`,
      [
        stall_id,
        name.trim(),
        category || null,
        cuisine || null,
        price,
        image_url || null,
        description || null,
        season_tag || "all_season",
        req.user.id,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create food item error:", error);
    return res.status(500).json({ error: "Failed to create food item" });
  }
});

router.patch("/:id", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query("SELECT * FROM food_items WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Food item not found" });
    }

    const item = existing.rows[0];
    const canEdit = req.user.id === item.created_by || req.user.role === "admin";

    if (!canEdit) {
      return res.status(403).json({ error: "Access denied" });
    }

    const allowedFields = [
      "name",
      "category",
      "cuisine",
      "price",
      "image_url",
      "description",
      "season_tag",
    ];

    const updates = [];
    const values = [];
    let idx = 1;

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        const value = req.body[field];
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
      UPDATE food_items
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update food item error:", error);
    return res.status(500).json({ error: "Failed to update food item" });
  }
});

module.exports = router;
