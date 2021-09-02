const express = require('express');
const app = express();
const winston = require("winston")
require("./start/logging")()
require("./start/routes")(app)
require("./start/db")()
require("./start/config")()

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  winston.info(`${port}chi portni eshitishni boshladim...`);
});

module.exports = server;