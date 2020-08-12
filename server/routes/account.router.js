const express = require('express');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/:id', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  // If the current user doesn't have a high enough access level return unauthorized.
  if (accessLevel < 100) {
    res.sendStatus(401);
    return;
  }
  const id = req.params.id;
  const conn = await pool.connect();
  try {
    const query = {};
		query.text = `SELECT account.id, account."name", account.email, account.access_level, profile.*
			FROM account
			LEFT JOIN profile ON account.id = profile.account_id
			WHERE account.id = $1;`;
    query.values = [id];
    await conn.query('BEGIN');
    const result = await conn.query(query.text, query.values);
    await conn.query('COMMIT');
    conn.release();
    if (result.rows[0]) {
      res.status(200).send(result.rows[0]);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    conn.query('ROLLBACK');
    console.log(`Error GET /api/account/${id}`, error);
    res.sendStatus(500);
  }
});

// // Return an array with the ids of all members from the input household id.
// router.get('/household-members/:id', rejectUnauthenticated, async (req, res) => {
//   const householdID = req.params.id;
//   const conn = await pool.connect();
//   try {
//     const query = {};
//     query.text = `SELECT account."name", account.email FROM profile JOIN account
//       ON "profile".account_id = account.id WHERE household_id = $1;`;
//     query.values = [householdID];
//     const result = await conn.query(query.text, query.values);
//     conn.release();
//     res.status(200).send(result.rows);
//   } catch (error) {
//     console.log(`Error GET /api/order/household-id/${householdID}`, error);
//     res.sendStatus(500);
//   }
// });

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const houseId = req.body.household_id;
  if (!name || !email || !houseId || !req.body.password) {
    res.sendStatus(400);
    return;
  }
  const password = encryptLib.encryptPassword(req.body.password);
  const conn = await pool.connect();
  try {
    const profileQuery = {};
    profileQuery.text = `INSERT INTO "account" (name, email, password)
                         VALUES ($1, $2, $3)
                         RETURNING id;`;
    profileQuery.values = [name, email, password];
    await conn.query('BEGIN');
    const result = await conn.query(profileQuery.text, profileQuery.values);
    const accountQuery = {};
    accountQuery.text = `INSERT INTO "profile" (account_id, household_id)
                         VALUES ($1, $2) RETURNING account_id`;
    accountQuery.values = [result.rows[0].id, houseId];
    await conn.query(accountQuery.text, accountQuery.values);
    await conn.query('COMMIT');
    conn.release();
    res.status(200).send(result.rows[0]);
  } catch (error) {
    conn.query('ROLLBACK');
    console.log('Error POST /account', error);
    res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const accessLevel = req.body.accessLevel;
  if (!id || !name || !email || !accessLevel) {
    res.sendStatus(400);
    return;
  }
  const conn = await pool.connect();
  try {
    const query = {};
    query.text = 'UPDATE "account" SET "name" = $1, "email" = $2, "access_level" = $3 WHERE id = $4 RETURNING *;';
    query.values = [name, email, accessLevel, id];
    await conn.query('BEGIN');
    const result = await conn.query(query.text, query.values);
    await conn.query('COMMIT');
    conn.release();
    res.status(200).send(result.rows);
  } catch (error) {
    conn.query('ROLLBACK');
    console.log('Error PUT /account', error);
    res.sendStatus(500);
  }
  res.send(req.user);
});

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  const accessLevel = req.user.access_level;
  // If the current user doesn't have a high enough access level return unauthorized.
  if (accessLevel < 100) {
    res.sendStatus(401);
    return;
  }
  const id = req.params.id;
  const conn = await pool.connect();
  try {
    const query = {};
    query.text = 'DELETE from "account" WHERE "id" = $1;';
    query.values = [id];
    await conn.query('BEGIN');
    await conn.query(query.text, query.values);
    await conn.query('COMMIT');
    conn.release();
    res.sendStatus(204);
  } catch (error) {
    conn.query('ROLLBACK');
    console.log('Error DELETE /account', error);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
