const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query(`SELECT row_to_json("order".*) AS latest_order, account."name", account.email,
              account.access_level, profile.household_id FROM "order"
              LEFT JOIN account ON "order".account_id = account.id
              LEFT JOIN profile ON "order".account_id = profile.account_id
              WHERE account.id = $1
              ORDER BY "order".checkout_at DESC
              LIMIT 1;`, [id])
    .then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    }).catch((error) => {
      console.log('Error with query during deserializing user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
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
