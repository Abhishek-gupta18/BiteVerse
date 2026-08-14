const express = require("express");
const { pool } = require("../config/db");
const { authenticateToken, authorizeRole, requireVerified } = require("./auth");

const router = express.Router();

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const isAdmin = (user) => user && user.role === "admin";

router.get("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { college_id, search, status, limit, offset } = req.query;

    if (!college_id) {
      return res.status(400).json({ error: "college_id query parameter is required" });
    }

    const limitValue = parsePositiveInteger(limit, 20);
    const offsetValue = parsePositiveInteger(offset, 0);
    const searchTerm = typeof search === "string" ? search.trim() : "";

    const conditions = ["college_id = $1"];
    const values = [college_id];
    let idx = 2;

    if (searchTerm) {
      conditions.push(`LOWER(name) LIKE LOWER($${idx})`);
      values.push(`%${searchTerm}%`);
      idx += 1;
    }

    let finalStatusClause = "status = 'approved'";
    if (req.user && isAdmin(req.user) && typeof status === "string" && status.trim()) {
      const normalizedStatus = status.trim().toLowerCase();
      if (["pending", "approved", "rejected"].includes(normalizedStatus)) {
        finalStatusClause = `status = $${idx}`;
        values.push(normalizedStatus);
        idx += 1;
      }
    }

    conditions.push(finalStatusClause);

    const query = `
      SELECT *
      FROM stalls
      WHERE ${conditions.join(" AND ")}
      ORDER BY created_at DESC
      LIMIT $${idx} OFFSET $${idx + 1}
    `;

    values.push(limitValue, offsetValue);

    const result = await pool.query(query, values);
    return res.json(result.rows);
  } catch (error) {
    console.error("Get stalls error:", error);
    return res.status(500).json({ error: "Failed to fetch stalls" });
  }
});

router.get("/:id", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM stalls WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    const stall = result.rows[0];
    const canViewAnyStatus = req.user && (req.user.id === stall.created_by || isAdmin(req.user));

    if (stall.status === "approved" || canViewAnyStatus) {
      return res.json(stall);
    }

    return res.status(404).json({ error: "Stall not found" });
  } catch (error) {
    console.error("Get stall by id error:", error);
    return res.status(500).json({ error: "Failed to fetch stall" });
  }
});

router.post("/", authenticateToken, requireVerified, async (req, res) => {
  try {
    const { college_id, name, food_court, location, description, image_url } = req.body;

    if (!college_id || !name) {
      return res.status(400).json({ error: "college_id and name are required" });
    }

    const stallResult = await pool.query(
      `INSERT INTO stalls (college_id, name, food_court, location, description, image_url, status, created_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, NOW(), NOW())
       RETURNING *`,
      [college_id, name.trim(), food_court || null, location || null, description || null, image_url || null, req.user.id]
    );

    return res.status(201).json(stallResult.rows[0]);
  } catch (error) {
    console.error("Create stall error:", error);
    return res.status(500).json({ error: "Failed to create stall" });
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query("SELECT * FROM stalls WHERE id = $1", [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    const stall = existing.rows[0];
    const canEdit = req.user.id === stall.created_by || req.user.role === "admin";

    if (!canEdit) {
      return res.status(403).json({ error: "Access denied" });
    }

    const allowedFields = ["name", "food_court", "location", "description", "image_url"];
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
      UPDATE stalls
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update stall error:", error);
    return res.status(500).json({ error: "Failed to update stall" });
  }
});

router.patch("/:id/approve", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE stalls
       SET status = 'approved', updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Approve stall error:", error);
    return res.status(500).json({ error: "Failed to approve stall" });
  }
});

router.patch("/:id/reject", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE stalls
       SET status = 'rejected', updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Reject stall error:", error);
    return res.status(500).json({ error: "Failed to reject stall" });
  }
});

module.exports = router;
