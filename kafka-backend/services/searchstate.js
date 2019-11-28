var DiseaseDrugRegions=require('../models/DiseaseDrugRegions');

function handle_request(msg, callback){
  
   console.log("Inside search State");  
   var pkg={};
   console.log(msg);
   DiseaseDrugRegions.find({State:msg.state},{},{limit:5, sort:{ Value: -1 }},function(error, results){
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
