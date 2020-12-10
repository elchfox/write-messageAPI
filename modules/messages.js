var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var message = new Schema({
    message: {type:String, required: true },
    subject: {type:String, required: true },
    senderId:  {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:  {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {type:Date, default: Date.now }
});


module.exports = mongoose.model('Message', message);