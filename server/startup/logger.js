const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.simple())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.simple())
    })
  ]
});

module.exports = logger;