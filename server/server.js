require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const locationRouter = require('./routes/location.router');
const accountRouter = require('./routes/account.router');
const orderRouter = require('./routes/order.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Passport Session Configuration
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/location', locationRouter);
app.use('/api/account', accountRouter);
app.use('/api/order', orderRouter);

module.exports = app;
