const express = require('express');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

router.get('/', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  if (accessLevel < 10) {
    res.sendStatus(401);
    return;
  }
  const conn = await pool.connect();
  try {
    const result = await conn.query(`SELECT "order".*, account."name", account.email,
      profile.household_id, profile.latest_order FROM "order"
      LEFT JOIN account ON "order".account_id = account.id
      LEFT JOIN profile ON account.id = profile.account_id;`);
    conn.release();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log('Error GET /api/order', error);
    res.sendStatus(500);
  }
});

router.get('/active', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  if (accessLevel < 10) {
    res.sendStatus(401);
    return;
  }
  const conn = await pool.connect();
  try {
    const query = {};
    query.text = `SELECT "order".*, account."name", profile.household_id, profile.latest_order FROM "order"
      LEFT JOIN account ON "order".account_id = account.id
      LEFT JOIN profile ON account.id = profile.account_id 
      WHERE checkout_at IS NULL 
      ORDER BY checkin_at DESC;`;
    query.values = [];
    const result = await conn.query(query.text, query.values);
    conn.release();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log('Error GET /api/order/active', error);
    res.sendStatus(500);
  }
});

router.get('/complete/today', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  if (accessLevel < 10) {
    res.sendStatus(401);
    return;
  }
  const conn = await pool.connect();
  try {
    const query = {};
    query.text = `SELECT "order".*, account."name", profile.household_id, profile.latest_order FROM "order"
      LEFT JOIN account ON "order".account_id = account.id
      LEFT JOIN profile ON account.id = profile.account_id 
        WHERE checkout_at 
          BETWEEN NOW() - INTERVAL '24 HOURS' 
          AND NOW()
        ORDER BY checkout_at DESC;`;
    query.values = [];
    const result = await conn.query(query.text, query.values);
    conn.release();
    res.status(200).send(result.rows);
  } catch (error) {
    console.log('Error GET /api/order/active', error);
    res.sendStatus(500);
  }
});

router.post('/', rejectUnauthenticated, async (req, res) => {
  const accountID = req.user.id;

  const locationID = req.body.location_id;
  const dietaryRestrictions = req.body.dietary_restrictions;
  const walkingHome = req.body.walking_home;
  const pregnant = req.body.pregnant;
  const childBirthday = req.body.child_birthday;
	const snap = req.body.snap;
	const pickupName = req.body.pickup_name;
  const other = req.body.other;
  let waitTimeMinutes;
  try {
    waitTimeMinutes = Number(req.body.wait_time_minutes);
  } catch (error) {
    res.sendStatus(400);
    return;
  }

  // TODO only allow volunteers to specify the wait time.
  if (!locationID ||
    typeof dietaryRestrictions !== 'string' ||
    typeof walkingHome !== 'boolean' ||
    typeof pregnant !== 'boolean' ||
    typeof childBirthday !== 'boolean' ||
		typeof snap !== 'boolean' ||
		typeof pickupName !== 'string' ||
    typeof other !== 'string'
  ) {
    res.sendStatus(400);
    return;
  }

  const conn = await pool.connect();
  try {
    const query = {};
    query.text = `INSERT INTO "order" (
      account_id,
      location_id,
      dietary_restrictions,
      walking_home,
      pregnant,
      child_birthday,
			snap,
			pickup_name,
      other,
      wait_time_minutes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;`;
    query.values = [
      accountID,
      locationID,
      dietaryRestrictions,
      walkingHome,
      pregnant,
      childBirthday,
			snap,
			pickupName,
      other,
      waitTimeMinutes
    ];
    await conn.query('BEGIN');
    const result = await conn.query(query.text, query.values);
    await conn.query('COMMIT');
    conn.release();
    res.status(201).send(result.rows[0]);
  } catch (error) {
    await conn.query('ROLLBACK');
    console.log('Error POST /api/order', error);
    res.sendStatus(500);
  }
});

router.put('/checkout/:id', async (req, res) => {
  const accessLevel = req.user.access_level;
  if (accessLevel < 10) {
    res.sendStatus(401);
    return;
  }
  let waitTimeMinutes;
  try {
    waitTimeMinutes = Number(req.body.wait_time_minutes);
  } catch (error) {
    res.sendStatus(400);
    return;
  }

  const conn = await pool.connect();
  try {
    const query = {};
    query.text = `UPDATE "order"
      SET checkout_at = NOW(), wait_time_minutes = $2
      WHERE id = $1
      RETURNING *;`;
    query.values = [req.params.id, waitTimeMinutes];
    await conn.query('BEGIN');
    const result = await conn.query(query.text, query.values);
    await conn.query('COMMIT');
    conn.release();
    res.status(200).send(result.rows);
  } catch (error) {
    conn.query('ROLLBACK');
    console.log('Error PUT /api/order/checkout/id', error);
    res.sendStatus(500);
  }
});

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  if (accessLevel < 100) {
    res.sendStatus(401);
    return;
  }
  const conn = await pool.connect();
  try {
    const query = {};
    query.text = 'DELETE FROM "order" WHERE id = $1;';
    query.values = [req.params.id];
    await conn.query(query.text, query.values);
    conn.release();
    res.sendStatus(204);
  } catch (error) {
    console.log('Error PUT /api/order/checkout/id', error);
    res.sendStatus(500);
  }
});
// end DELETE

module.exports = router;
