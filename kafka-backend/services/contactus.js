//import the require dependencies
var Feedback=require('../models/Feedback');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Send Message");  
   var respmsg="";
  
   var feedbacks=Feedback({
     email:msg.email,
     message:msg.message
   }) 

     feedbacks.save(function(error, results){
         if (error){
                console.log(error);
                respmsg="Could Not Send Message! :(";
                callback(null, respmsg);
             }else {
               console.log("Addededded");
               respmsg="Message Sent!" ;  
               callback(null, respmsg);    
               console.log("after callback");        
             }
           })
};

exports.handle_request = handle_request;
