## Requirements
------------
```
node 0.10.x
npm 1.4.14
mysql 5.5.x
redis 2.2.12
```

## Run app / Stop app
-------
Start  
`$ npm start`  
or for debug   
`$ npm run-script debug`  
Stop   
`Ctrl+C`  

## App structure
-------
**`configuration`** - All settings  
*`-database.js`* - Database configuration  
*`-emailer.js`* - Mail configuration  
*`-errors.js`* - Errors handling configuration  
*`-routes.js`* - Routes configuration  
*`-security.js`* - Security configuration for protected part of site  
*`-settings.js.template`* - Template for application settings, should be copied to settings.js and configured  
*`-start`* - Script for starting application  
*`-webconfig.js`* - Middleware and other web layer related configuration  

**`web`** - Web layer  
**`--controllers`** - Web controllers  
**`--routes`** - Routes configuration  
**`--utils`** - Web related utilities (view helpers, session utilities etc)  

**`messages`** - Localised messages and email templates  
**`models`** - Objects models    
**`public`** - Static data (js, css etc.)   
**`services`** - Service layer  
**`sql`** - sql scripts for application    
**`views`** - Application's views (templates)   
