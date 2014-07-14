var express = require('express');
var path = require('path');
var middleware = require('./configuration/middleware');
var routes = require('./configuration/routes');
var custom = require('./configuration/custom');
var errors = require('./configuration/errors');
var security = require('./configuration/security');

var app = express();

// Middleware configuration
middleware.init(app);

// Setting up static resources directory
app.use(express.static(path.join(__dirname, 'public')));

// Setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Customize chain
custom.init(app);

// Initialize security
security.init(app);

// Routes configuration
routes.init(app);

// Setup error handling
errors.init(app);

module.exports = app;
