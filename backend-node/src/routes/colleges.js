const express = require("express");
const { pool } = require("../config/db");
const { authenticateToken, authorizeRole } = require("./auth");

const router = express.Router();

const normalizeCollegeFilters = (req) => {
  const { search, city, state, type } = req.query;

  return {
    search: typeof search === "string" ? search.trim() : "",
    city: typeof city === "string" ? city.trim() : "",
    state: typeof state === "string" ? state.trim() : "",
    type: typeof type === "string" ? type.trim() : "",
  };
};

router.get("/", async (req, res) => {
  try {
    const filters = normalizeCollegeFilters(req);
    const conditions = [];
    const values = [];
    let idx = 1;

    if (filters.search) {
      conditions.push(`LOWER(name) LIKE LOWER($${idx})`);
      values.push(`%${filters.search}%`);
      idx += 1;
    }

    if (filters.city) {
      conditions.push(`LOWER(city) = LOWER($${idx})`);
      values.push(filters.city);
      idx += 1;
    }

    if (filters.state) {
      conditions.push(`LOWER(state) = LOWER($${idx})`);
      values.push(filters.state);
      idx += 1;
    }

    if (filters.type) {
      conditions.push(`LOWER(type) = LOWER($${idx})`);
      values.push(filters.type);
      idx += 1;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM colleges ${whereClause} ORDER BY name ASC`;

    const result = await pool.query(query, values);
    return res.json(result.rows);
  } catch (error) {
    console.error("Get colleges error:", error);
    return res.status(500).json({ error: "Failed to fetch colleges" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM colleges WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "College not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get college by id error:", error);
    return res.status(500).json({ error: "Failed to fetch college" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, city, state, type } = req.body;

    if (!name || !city || !state || !type) {
      return res.status(400).json({
        error: "Name, city, state, and type are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO colleges (name, city, state, type, is_verified, created_at)
       VALUES ($1, $2, $3, $4, false, NOW())
       RETURNING *`,
      [name.trim(), city.trim(), state.trim(), type.trim()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create college error:", error);
    return res.status(500).json({ error: "Failed to create college" });
  }
});

router.patch("/:id/verify", authenticateToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE colleges
       SET is_verified = true
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "College not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Verify college error:", error);
    return res.status(500).json({ error: "Failed to verify college" });
  }
});

module.exports = router;
