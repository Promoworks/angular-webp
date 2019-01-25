// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
var cors = require('cors');
const bodyParser = require('body-parser');
var compression = require('compression');
//var robots = require('robots.txt');
//var sitemap = require('sitemap.xml');

// Get our API routes

const app = express();
app.use(cors());



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname)));



// Catch all other routes and return the index file
app.use(function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendFile(path.join(__dirname, '/index.html'));

});


app.post('/', function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    res.send({"hello":"world"})
});

app.options('*', function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});



app.use('/*', function (req, res, next) {

  if (req.url.indexOf("/images/") === 0 || req.url.indexOf("/stylesheets/") === 0) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }
  next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8061';
app.set('port', port);


app.use(compression());


/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));


