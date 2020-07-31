require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

const accountRouter = require('./routes/account.router');

app.use("/api/account", accountRouter);

module.exports = app;
