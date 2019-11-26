//import the require dependencies
var Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const config = require("../config/settings");

function handle_request(msg, callback) {
  console.log(msg.email);
  console.log("Inside User Profile Update");
//   bcrypt.hash(msg.password, saltRounds, function(err, hash) {
//       if err throw err
  Users.findOneAndUpdate({email:msg.email}, {
    fullname: msg.fullname,
    password:hash,
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
  //})
})
}

exports.handle_request = handle_request;
