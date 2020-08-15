const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const conn = await pool.connect();
  try {
    // Get the various attributes about a ussr.
    const getUserInfoQuery = {};
    getUserInfoQuery.text = `SELECT account.id, account."name", account.email, account.access_level, account.active,
                            profile.household_id, profile.latest_order FROM account
                            LEFT JOIN profile ON account.id = profile.account_id
                            WHERE account.id = $1;`;
    getUserInfoQuery.values = [id];
    await conn.query('BEGIN');
    const result = await conn.query(getUserInfoQuery.text, getUserInfoQuery.values);
    const user = result && result.rows && result.rows[0];

    // Do a second query that updates the user's profile to include the latest order object.
    const getLatestOrderObjectQuery = {};
    getLatestOrderObjectQuery.text = 'SELECT * FROM "order" WHERE id = $1;';
    getLatestOrderObjectQuery.values = [user.latest_order];
    const orderRow = await conn.query(getLatestOrderObjectQuery.text, getLatestOrderObjectQuery.values);
    await conn.query('COMMIT');
    conn.release();

    if (user) {
      // Remove the user's password so it doesn't get sent.
      delete user.password;
      // done takes an error (null in this case) and a user.
      done(null, { ...user, latest_order: null && orderRow.rows && orderRow.rows[0] });
    } else {
      // User not found.
      // done takes an error (null in this case) and a user (also null in this case).
      // This will result in the server returning a 401 status code.
      done(null, null);
    }
  } catch (error) {
    conn.query('ROLLBACK');
    console.log('Error getting user information.', error);
  }
});

// Does actual work of logging in
passport.use('local', new LocalStrategy((username, password, done) => {
  pool.query('SELECT * FROM "account" WHERE email = $1', [username])
    .then((result) => {
      const user = result && result.rows && result.rows[0];
      if (user && encryptLib.comparePassword(password, user.password)) {
        // All good! Passwords match!
        // done takes an error (null in this case) and a user
        done(null, user);
      } else {
        // Not good! Username and password do not match.
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    }).catch((error) => {
      console.log('Error with query for user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
}));

module.exports = passport;
