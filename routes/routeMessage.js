var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Message = require('../modules/messages');
var User = require('../modules/users');


router.get('/',(req,res)=>{

});

router.get('/message/:id',(req,res)=>{
    let id = req.params.id;
    Message.findById(mongoose.Types.ObjectId(id),(err,result)=>{
      if(err) return res.send(err)
      res.send(result)
    })
});

router.get("/getMessagesSent",(req,res)=>{
  let userId = req.query.userId;
  console.log(userId)
  let query = [ {
      $match: { _id: mongoose.Types.ObjectId(userId)}
  },{
      $lookup: {
        from: "messages",
        pipeline: [{
          $match: {
            'senderId': mongoose.Types.ObjectId(userId)
          
          }
        },
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "account"
        }
      }, {
        $unwind: "$account"
      },
      { $sort: {date:-1}}
    ],
    as: "messages"},
  }
   
   ]
  User.aggregate(query).exec(async (err, result) =>{ 
    if(err) return res.send(err)
      console.log(result)
      res.send(result)
    });
});
router.get("/getMessagesReceiver",(req,res)=>{
  let userId = req.query.userId;
  console.log(userId)
  let query = [ {
    $match: { _id: mongoose.Types.ObjectId(userId)}
},{
    $lookup: {
      from: "messages",
      pipeline: [{
        $match: {
          'receiverId':  mongoose.Types.ObjectId(userId)}
      },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "account"
      }
    }, {
      $unwind: "$account"
    },
    { $sort: {date:-1}}
  ],
  as: "messages"},
} ]
  User.aggregate(query).exec(async (err, result) =>{ 
    if(err) return res.send(err)
      console.log(result)
      res.send(result)
    });
});

router.get("/findAll",(req,res)=>{
    Message.find((err,result)=>{
        if(err){
          return res.send(err)
        }
        res.send(result)
      })
});
router.post("/createNew",(req,res)=>{
    let body = req.body
    let message =  body.message; 
    let subject =  body.subject; 
    let senderId =  body.senderId; 
    let receiverId =  body.receiverId; 
    var msg =  Message({ message,subject,senderId,receiverId})

    msg.save((err,result)=>{
        if(err){
        return res.send(err)
        }
        res.send(result)

        
    })
});
router.delete("/message/:id",(req,res)=>{
    Message.findByIdAndRemove(mongoose.Types.ObjectId(id),(err,result)=>{
        if(err) return res.send(err)
        res.send(result)
      })
});


module.exports = router;