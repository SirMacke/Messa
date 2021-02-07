const express = require('express');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

/*const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');*/

const cookieParser = require('cookie-parser');

const messenger = require('../routes/api/messenger');
const login = require('../routes/api/login');
const signup = require('../routes/api/signup');

const error = require('../middleware/error');

module.exports = function(app) {
  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'));
  }

  app.use(cors());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());

  app.use(express.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(cookieParser());

  //app.use(enforce.HTTPS({ trustProtoHeader: true }));
  //app.use(serveStatic(path.dirname(require.main.filename)));
  //app.use(history());

  app.use('/api/messenger', messenger);
  app.use('/api/login', login);
  app.use('/api/signup', signup);

  app.use(error);
}