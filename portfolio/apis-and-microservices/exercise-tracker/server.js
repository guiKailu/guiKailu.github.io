'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI, {
  useNewUrlParser: true
});

var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: Date
});

var trackerSchema = new Schema({
  username: String,
  exercises: [exerciseSchema]
});

var Tracker = mongoose.model('tracker', trackerSchema);

app.use(cors());

app.use(
  bodyParser.urlencoded({
  extended: false
  })
);

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/exercise/new-user", function (req, res, next) {
  
//   Check if username is already taken.
  Tracker.findOne({"username": req.body.username}, function(err, data){
     if (err){
       throw err;
     }
    var duplicate = data ? true : false;
    if (duplicate){
      res.send("Username taken. Please try a different name.");
    } else {
//     If not taken, then create the new username
      req.username = req.body.username;
  
      var trackerRecord = new Tracker({ username: req.username});

      trackerRecord.save(function(err, data){
        if (err){
          throw err;
        }

      Tracker.findOne({"username": req.username}, function(err, data){
        if (err){
          throw err;
        } else {
          req.id = data._id;
          res.send({"username": req.username, "id": req.id});
        }
      });
    });
    }
  });
});

app.post("/api/exercise/add", function (req, res, next) {

  console.log(req.body.description);
  var d = new Date();

  Tracker.findOne({"_id": req.body.userId}, function(err, data){
    
    var exerciseDate;
    
    if (req.body.date){
      console.log("a date was indeed entered");
      exerciseDate = req.body.date;
    } else {
      console.log("a date was not entered");
      exerciseDate = d;
    }
    
    data.exercises = data.exercises.concat({
      description: req.body.description,
      duration: req.body.duration,
      date: exerciseDate
    });
    
    console.log(data);
    
    data.save(function(err, data){
      if (err){
        throw err;
      }
    })
    console.log(d);

    res.send({
      "username": req.body.userId,
      "description": req.body.description,
      "duration": req.body.duration,
      "date": req.body.date ? exerciseDate : d.toDateString()
    });
  });
});

// /api/exercise/log?{userId}[&from][&to][&limit]
  app.get("/api/exercise/log/:userId", function(req, res, next) {
    var theUserID = req.params.userId;

    Tracker.findById(theUserID, function(err, data){
      console.log(data);
      res.send(data);
    });
  });

app.listen(port, function () {
  console.log('Node.js listening ...');
});  