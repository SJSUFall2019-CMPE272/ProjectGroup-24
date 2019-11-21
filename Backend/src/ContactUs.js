var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');


router.post('/contactus',function(req,res){
  console.log("Inside Contact Us ");  
  console.log(req.body); 
  
let body = req.body;
console.log("Inside API of Send Message ", body)
kafka.make_request('contactus', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});
  })  

    module.exports = router;