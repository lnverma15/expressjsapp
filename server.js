
// server.js

const express = require('express');
const app = express();
const routes = require('./routes');
const middleware = require('./middleware'); // Import the middleware module

// Use middleware in the entire app
app.use(middleware.bodyParserJSON);
app.use(middleware.bodyParserURLEncoded);
// app.use(middleware.customMiddleware);

// Use the routes defined in routes.js
app.use('/', routes);

const db = require('./db.config');
db.sequelize.sync(); // Create table if it doesn't exist

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});
