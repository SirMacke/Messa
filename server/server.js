const winston = require('winston');
const express = require('express');
var app = express();

const logger = require('./startup/logger.js');
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();
require('./startup/prod.js')(app);
require('./routes/api/messenger.js')();

var port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.log('info', `Listening on port ${port}...`));

module.exports = server;