Requirements
------------
  node 0.10.x
  npm 1.4.14
  mysql 5.5.x
  redis 2.2.12

Run app / Stop app
-------
```
Start
  $ npm start
or
  $ npm run-script debug
for debug

App structure
-------
configuration - All settings
controllers - Web layer
messages - Localised messages and email templates
models - Objects models
public - Static data (js, css etc.)
routes - Routes configuration
services - Service layer
sql - sql scripts for application
views - Application's views (templates)