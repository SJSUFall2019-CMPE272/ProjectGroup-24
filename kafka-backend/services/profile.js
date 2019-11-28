//import the require dependencies
var Users=require('../models/Users');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Get Profile");  
   var pkg={};

     Users.find({ email:msg.email},function(error, results){
         if (error){
                console.log(error);
                pkg={
                    msg:"Error"
                }
                callback(null,pkg);
             }else {
                pkg={
                    msg:"Data",
                    details:results[0]
                }
                callback(null,pkg);
             }
           })
};

exports.handle_request = handle_request;
