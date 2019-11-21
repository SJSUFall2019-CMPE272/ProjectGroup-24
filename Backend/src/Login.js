var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/login',function(req,res){
 
  console.log(req.body)
  let body = req.body;
  console.log("Inside API of Login", body)
  kafka.make_request('login', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
        res.send(result);
      }

  })
})

module.exports = router;