var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var api = require('./routes/routeApi')



app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/WriteMessages',{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/api', api);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handlers
  
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    console.log(err.status)
    res.status(err.status || 500);
    res.send('error');
  
  });

module.exports = app;

