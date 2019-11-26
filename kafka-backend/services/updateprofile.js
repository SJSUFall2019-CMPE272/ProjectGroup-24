//import the require dependencies
var Users = require("../models/Users");

function handle_request(msg, callback) {
  console.log(msg.email);
  console.log("Inside User Profile Update");

  Users.findOneAndUpdate({email:msg.email}, {
    fullname: msg.fullname,
    address: msg.address,
    mobile: msg.mobile,
    city: msg.city,
    country: msg.country,
    zipcode: msg.zipcode
  },function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(msg.email);

      callback(null, "Details Updated!");
  })
}

exports.handle_request = handle_request;
