// server.js
// where your node app starts

// init project
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(
  bodyParser.urlencoded({
  extended: false
  })
);

app.get('/api/timestamp/:date_string?', function(req, res, next){

//   Save the url input
  var t = req.params.date_string;
  
//   If the input is an integer, convert it from string to integer.
  if (Number.isInteger(+t)){
    t = +t;
  }
  
//   If there is no input
  if (!t){
//   Then use the current time.
    req.time = {"time": new Date().toString() };
//   If input is a valid date
  } else if (new Date(t) != "Invalid Date") {
//   Output a json object with unix and utc time formats
    req.time = {"unix": new Date(t).getTime() , "utc": new Date(t).toUTCString() };
  } else {
//   Otherwise output an error message as a json object.
    req.time = {"error" : "Invalid Date" };
  }
  next();
}, function(req, res){
  res.send(req.time);
} );

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});