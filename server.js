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


//var whitelist = ['http://localhost:8061']
//var corsOptions = {
//  origin: function (origin, callback) {
//    if (whitelist.indexOf(origin) !== -1) {
//      callback(null, true)
//    } else {
//      callback(new Error('Not allowed by CORS'))
//    }
//  }
//}


// Set Robots Folder
//app.use(robots(__dirname + '/robots.txt'));


// Set Sitemap Folder
//app.use(sitemap(__dirname + '/sitemap.xml'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname)));



// Catch all other routes and return the index file
app.use('*',  cors(),(req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
//      res.json({msg: 'This is CORS-enabled for a Single Route'})

});



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:8061');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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



//    const port = process.env.PORT || 8061;
//
//    const server = app.listen(port, function(){
//     console.log('Listening on port ' + port);
//    });