var DiseaseDrugRegions=require('../models/DiseaseDrugRegions');

function handle_request(msg, callback){
  
   console.log("Inside Get Location");  
   var pkg={};
//db.inventory.distinct( "dept" )

DiseaseDrugRegions.distinct("Region",function(error, results){
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
