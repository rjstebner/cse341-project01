const express = require('express');
const mongodb = require('./db/connect');
const app = express();
const port = 3000;

// Import routes
const routes = require('./routes');
const e = require('express');

// Use routes
app.use('/', routes);

mongodb.initDB((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});