var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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

router.get("/findAll",(req,res)=>{
    Message.find((err,result)=>{
        if(err){
          return res.send(err)
        }
        res.send(result)
      })
});


router.get("/findUser",(req,res)=>{
  let username  = req.query.username;
  reg = new RegExp(username)
  User.find({ username: { $regex: reg} },
  (err,result)=>{
      if(err){
        return res.send(err)
      }
      res.send(result)
    })
});
router.post("/signIn",(req,res)=>{
  let data = req.body
  User.findOne({username: data.username},(err,user)=>{
    bcrypt.compare(req.body.password,user.password,(errCompre,checkPassword)=>{
    if(checkPassword){
      // save the user
      if (err){
        res.send(err)
      }else{
      jwt.sign({email:user.email},'secretkey',{expiresIn:"180d"},(err,token)=>{
        jwt.verify(token,"secretkey",(err,resToken)=>{
          let data = {
            user,
            token,
            exp:resToken.exp,
            iat:resToken.iat
          }
          console.log(resToken)
          res.send(data)
        })
      })
      }
    }else{
      res.send({error:'password not watch'})
    }
      
  })
  })

});
router.post("/signUp",(req,res)=>{
  console.log('gggg')
  let body = req.body
  let username =  body.username; 
  let password =  body.password;
  User.findOne({username},(err,ex)=>{

    if(ex == null){
      var user =  User({ username,
        password:bcrypt.hashSync(password,10)
      })
      user.save((err,result)=>{
          if(err){
          return res.send(err)
          }
          res.send(result)
    
          
      })
    }else{
      res.send({erorr:"username already exist"})
    }
 
  }) 

});


module.exports = router;