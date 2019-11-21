//import the require dependencies
var Users = require("../models/Users");
const bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
const config = require("../config/settings");

function handle_request(msg, callback) {
  console.log(msg.email);
  console.log("Inside User Login");
  var resMsg = "";
  var uname;
  var pkg;
  let passwordInDb = "";
  console.log(msg.password)
  Users.find({ email: msg.email }, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result != null) {
      uname = result[0].fullname;
      console.log(msg.password);
      passwordInDb = result[0].password;
      console.log(passwordInDb)
      bcrypt.compare(msg.password, passwordInDb, function(err, resp) {
        if (resp) {
          console.log("alalsk");
          resMsg = "Login Successful";
          var token = {
            email: msg.username,
            user: "user"
          };

          var signed_token = jwt.sign(token, config.secret, {
            expiresIn: 86400 // in seconds
          });

          pkg = {
            msg: resMsg,
            name: uname,
            token: signed_token
          };
          console.log(pkg);
          callback(null, JSON.stringify(pkg));
          console.log("after callback");
        } else {
          resMsg = "Invalid Password";
          pkg = {
            msg: resMsg
          };
          console.log(pkg);
          callback(null, JSON.stringify(pkg));
          console.log("after callback");
        }
      });
    } else {
      pkg = {
        msg: "User not Found!"
      };
      console.log(pkg);
      callback(null, JSON.stringify(pkg));
      console.log("after callback");
    }
  
  });
}

exports.handle_request = handle_request;
