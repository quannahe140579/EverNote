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

module.exports = router;
