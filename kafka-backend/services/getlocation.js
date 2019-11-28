var Location=require('../models/Location');

function handle_request(msg, callback){
  
   console.log("Inside Get Location");  
   var pkg={};
//db.inventory.distinct( "dept" )
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
