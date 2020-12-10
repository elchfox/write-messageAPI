var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var user = new Schema({
    username: {type:String, required: true,unique:true },
    password: {type:String, required: true },
    date: {type:Date, default: Date.now }
});


module.exports = mongoose.model('User', user);