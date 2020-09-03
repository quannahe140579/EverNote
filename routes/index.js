var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username + " " + password);
  if (username && password) {
    userModel.find({ username: username, password: password }, function (
      err,
      result
    ) {
      console.log(result);
      if (result.length != 0) {
        res.render("../views/Home.ejs");
      }else{     
        res.render("../views/login.ejs");
      }
    });
  } else { 
    res.render("../views/login.ejs");
  }
});


router.get("/xyz", function(req, res){
    res.render("login.ejs");
})
router.get("/sigup",function(req, res){
  res.render("register.ejs")
})
router.post("/create", function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  if(username && password){
    userModel.find({
      username: username
    }, function(err, result){
      console.log("hahaha")
      if(err){
        console.log("Loi");
      };
      if(result.length != 0){
        console.log(result);
        console.log("da ton toi");
        res.render("register.ejs",{exist: "Tai Khoan Da Ton Tai"});
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
