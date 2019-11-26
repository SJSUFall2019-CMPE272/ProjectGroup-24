var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
// var passport = require('passport');
// var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/profile',function(req,res){

  console.log(req.body)
  let body = req.body;
  console.log("Inside API of Profile", body)
  kafka.make_request('profile', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
        res.send(result);
      }

  })
})

module.exports = router;