// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var port = process.env.PORT || 3000;

if(app.get('env') === 'development' ) {
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(process.env.PORT || 3000, () => console.log(`API running on localhost:${port}`));
} else {
/**
 * Get port from environment and store in Express.
 */

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server has been activated");
});


}


