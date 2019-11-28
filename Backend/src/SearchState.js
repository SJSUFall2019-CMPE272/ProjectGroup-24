var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.post('/searchstate',function(req,res){

  let body = req.body;
  console.log("Inside API of Get Location", body)
  kafka.make_request('searchstate', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
        res.send(result);
      }

  })
})

module.exports = router;