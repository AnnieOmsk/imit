var express = require('express');
var webconfig = require('./configuration/webconfig');
var routes = require('./configuration/routes');
var errors = require('./configuration/errors');
var security = require('./configuration/security');

var app = express();

// App main web configuration
webconfig.init(app);

// Initialize security
security.init(app);

// Routes configuration
routes.init(app);

// Setup error handling
errors.init(app);

module.exports = app;
