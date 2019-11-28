var DiseaseDrugRegions=require('../models/DiseaseDrugRegions');

function handle_request(msg, callback){
  
   console.log("Inside search Location");  
   var pkg={};
console.log("Alaukika received:",msg);
DiseaseDrugRegions.find({Region:msg.region},{},{limit:5, sort:{ Value: -1 }},function(error, results){
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
