const express = require('express');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const houseId = req.body.household_id;
  const password = encryptLib.encryptPassword(req.body.password);
  const conn = await pool.connect();
  try {
    const profileQuery = {};
    profileQuery.text = `INSERT INTO "account" (name, email, password)
                         VALUES ($1, $2, $3)
                         RETURNING id;`; 
    profileQuery.values = [name, email, password];
    await conn.query("BEGIN");
    const result = await conn.query(profileQuery.text, profileQuery.values);
    const accountQuery = {};
    accountQuery.text = `INSERT INTO "profile" (account_id, household_id)
                         SELECT id FROM "account"
                         VALUES ($4);`;
    accountQuery.values = [result.rows, houseId];
    await conn.query(accountQuery.text, accountQuery.values);
    await conn.query("COMMIT");
    res.status(200).send(result.rows);
  } catch (error) {
    conn.query("ROLLBACK");
    console.log(`Error POST /register`, error);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
