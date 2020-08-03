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
		res.status(200).send(result.rows[0]);
	} catch (error) {
		console.log(`Error GET /api/location/`, error);
		res.sendStatus(500);
	}
});
// end GET

// POST api/order
router.post("/", (req, res) => {
  res.status(201).send(req.body);
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
