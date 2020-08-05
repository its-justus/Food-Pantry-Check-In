const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET to /api/order
router.get("/", async (req, res) => {
	const conn = await pool.connect();
	try {
		const query = {};
		query.text = `SELECT * FROM "order";`;
		query.values = [];
		const result = await conn.query(query.text, query.values);
		res.status(200).send(result.rows);
	} catch (error) {
		console.log(`Error GET /api/order/`, error);
		res.sendStatus(500);
	}
});

router.get("/active", async (req, res) => {
	const conn = await pool.connect();
	try {
		const query = {};
		query.text = `SELECT * FROM "order" WHERE checkout_at IS NULL;`;
		query.values = [];
		const result = await conn.query(query.text, query.values);
		res.status(200).send(result.rows);
	} catch (error) {
		console.log(`Error GET /api/order/active`, error);
		res.sendStatus(500);
	}
});
// end GET

// POST api/order
router.post("/", async (req, res) => {
  const conn = await pool.connect();
	try {
		const query = {};
		query.text = `INSERT INTO "order" (
			account_id,
			location_id,
			dietary_restrictions,
			walking_home,
			pregnant,
			child_birthday
			)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *;`;
		query.values = [
			req.body.account_id,
			req.body.location_id,
			req.body.dietary_restrictions,
			req.body.walking_home,
			req.body.pregnant,
			req.body.child_birthday,
		];
		await conn.query("BEGIN");
		const result = await conn.query(query.text, query.values);
		await conn.query("COMMIT");
		res.status(201).send(result.rows[0]);
	} catch (error) {
		await conn.query("ROLLBACK");
		console.log(`Error POST /api/order/`, error);
		res.sendStatus(500);
	}
});
// end POST

// PUT /api/order/id
router.put("/1", (req, res) => {
  res.status(200).send(req.body);
});
// end PUT

// DELETE to /api/order/:id
router.delete("/1", (req, res) => {
  res.status(204).send(req.body);
});
// end DELETE

module.exports = router;
