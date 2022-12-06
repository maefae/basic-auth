"use strict";

const { sequelizeDatabase } = require("./src/models/Users.js");
const server = require("./src/server.js");

// make sure our tables are created, start up the HTTP server.
sequelizeDatabase
  .sync()
  .then(() => {
    server.start();
  })
  .catch((e) => {
    console.error("Could not start server", e.message);
  });
