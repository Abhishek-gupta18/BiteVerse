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

router.get("/trending", authenticateToken, requireVerified, async (req, res) => {
  try {
    const collegeId = Number(req.query.college_id);
    const limitValue = parsePositiveInteger(req.query.limit, 10);

    if (!collegeId || Number.isNaN(collegeId)) {
      return res.status(400).json({ error: "college_id query parameter is required" });
    }

    const query = `
      WITH recent_reviews AS (
        SELECT r.food_id, r.rating
        FROM reviews r
        INNER JOIN food_items fi ON fi.id = r.food_id
        INNER JOIN stalls s ON s.id = fi.stall_id
        WHERE s.college_id = $1
          AND r.created_at >= NOW() - INTERVAL '90 days'
      ),
      item_stats AS (
        SELECT
          fi.id,
          fi.name,
          s.name AS stall_name,
          fi.price,
          fi.image_url,
          fi.season_tag,
          ROUND(COALESCE(AVG(rr.rating), 0), 2) AS avg_rating,
          COUNT(rr.food_id)::int AS review_count
        FROM food_items fi
        INNER JOIN stalls s ON s.id = fi.stall_id
        LEFT JOIN recent_reviews rr ON rr.food_id = fi.id
        WHERE s.college_id = $1
        GROUP BY fi.id, fi.name, s.name, fi.price, fi.image_url, fi.season_tag
      ),
      global_stats AS (
        SELECT COALESCE(ROUND(AVG(rating), 2), 0) AS global_avg_rating
        FROM recent_reviews
      ),
      scored_items AS (
        SELECT
          i.id,
          i.name,
          i.stall_name,
          i.price,
          i.image_url,
          i.avg_rating,
          i.review_count,
          (
            ((i.review_count::numeric / (i.review_count::numeric + 10)) * i.avg_rating)
            + ((10::numeric / (i.review_count::numeric + 10)) * g.global_avg_rating)
          ) AS weighted_score,
          CASE
            WHEN i.season_tag = 'all_season' THEN 1.15
            WHEN i.season_tag = 'winter' AND EXTRACT(MONTH FROM NOW()) IN (11, 12, 1, 2) THEN 1.15
            WHEN i.season_tag = 'monsoon' AND EXTRACT(MONTH FROM NOW()) IN (6, 7, 8, 9) THEN 1.15
            WHEN i.season_tag = 'summer' AND EXTRACT(MONTH FROM NOW()) IN (3, 4, 5, 10) THEN 1.15
            ELSE 1.0
          END AS seasonal_boost
        FROM item_stats i
        CROSS JOIN global_stats g
      )
      SELECT
        id,
        name,
        stall_name,
        price,
        image_url,
        avg_rating,
        review_count
      FROM scored_items
      ORDER BY (weighted_score * seasonal_boost) DESC, review_count DESC, avg_rating DESC
      LIMIT $2
    `;

    const result = await pool.query(query, [collegeId, limitValue]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Get trending food items error:", error);
    return res.status(500).json({ error: "Failed to fetch trending food items" });
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
