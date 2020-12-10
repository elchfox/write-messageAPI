var express = require('express');
var app = express();


var message = require('./routeMessage')
var user = require('./routeUser')

app.use('/message', message);
app.use('/user', user);



module.exports = app;