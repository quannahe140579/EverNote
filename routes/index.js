var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if(username.length == 0 || password.length == 0){
    res.status(401).render("login");
    return;
  }
  if (username && password) {
    userModel.find({ username: username, password: password }, function (
      err,
      result
    ) {
      console.log(result);
      if (result.length != 0) {
        res.render("Home.ejs");
      }else{     
        res.render("login");
        return;
      }
    });
  } else { 
    res.render("login");
    return;
  }
});


router.get("/xyz", function(req, res){
    res.render("login.ejs");
})
router.get("/sigup",function(req, res){
  res.render("register.ejs",{empty: "Username or password is not empty"})
})
router.post("/account/sigup/create", function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  if(username.length == 0 || password.length == 0){
    res.status(400).render("register.ejs");
    return;
  }
  if(username && password){
    userModel.find({
      username: username
    }, function(err, result){
      if(err){
        console.log("Loi");
        return;
      };
      if(result.length != 0){
        console.log(result);
        res.render("register.ejs");
      }else{
        var user = {
          username: username,
          password: password,
          email: email
        }
        console.log(user);
        userModel.create(user, function(err, result){
          if(err) throw err;
          else{
            res.render("login.ejs")
          }
        });
      }
    })
   
  }
})
module.exports = router;
