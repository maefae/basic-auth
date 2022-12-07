"use strict";

// 3rd Party Resources
const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth/router.js");

// Prepare the express app
const app = express();

app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Adding in auth routes from router.js module
app.use(authRoutes);

function start() {
  app.listen(3000, () => console.log("server up"));
}

module.exports = {
  server: app,
  start: start,
};
