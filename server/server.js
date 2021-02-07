const winston = require('winston');
const express = require('express');
var app = express();

const logger = require('./startup/logger.js');
require('./startup/routes.js')(app);
require('./startup/prod.js')(app);

var port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;