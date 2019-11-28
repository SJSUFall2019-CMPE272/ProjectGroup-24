var Location=require('../models/Location');

function handle_request(msg, callback){
  
   console.log("Inside search Location");  
   var pkg={};
console.log(msg);
     Location.find({},function(error, results){
         if (error){
                console.log(error);
                pkg={
                    msg:"Error"
                }
                callback(null,pkg);
             }else {
                pkg={
                    msg:"Data",
                    details:results
                }
                callback(null,pkg);
             }
           })
};

exports.handle_request = handle_request;
