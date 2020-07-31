require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const locationRouter = require("./routes/location.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use("/api/location", locationRouter);

module.exports = app;
