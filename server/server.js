const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app;