var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
var noteModel = require("../models/note");
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username.length == 0 || password.length == 0) {
    req.flash("ErrorEmpty", "Username or password is empty");
    res.render("login", { error: req.flash("ErrorEmpty") });
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
      } else {
        req.flash("WrongAccount", "Username or password is wrong!");
        res.render("login", { error: req.flash("WrongAccount") });
        return;
      }
    });
  } else {
    res.render("login");
    return;
  }
});
router.get("/account/sigup", function (req, res) {
  res.render("register.ejs", { error: "" });
});
router.post("/account/sigup/create", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var passwordCf = req.body.passwordConfirm;
  var email = req.body.email;
  if (username.length == 0 || password.length == 0) {
    req.flash("ErrEmpty", "Username or password is empty");
    res.status(400).render("register.ejs", { error: req.flash("ErrEmpty") });
    return;
  }
  if (password != passwordCf) {
    req.flash("ErrDfrPassword", "Password is difference");
    res
      .status(401)
      .render("register.ejs", { error: req.flash("ErrDfrPassword") });
    return;
  }
  if (username && password) {
    userModel.find(
      {
        username: username,
      },
      function (err, result) {
        if (err) {
          return;
        }
        if (result.length != 0) {
          req.flash("ErrAccountExist", "Username is existing!");
          res
            .status(402)
            .render("register.ejs", { error: req.flash("ErrAccountExist") });
          return;
        } else {
          var user = {
            username: username,
            password: password,
            email: email,
          };
          console.log(user);
          userModel.create(user, function (err, result) {
            if (err) throw err;
            else {
              res.render("login.ejs", { error: "" });
            }
          });
        }
      }
    );
  }
});

function getNotes(res) {
  noteModel.find(function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
}

router.get("/api/notes", function (req, res) {
  getNotes(res);
});

router.post("/api/create", function (req, res) {
  var note = {
    name: req.body.name,
    content: req.body.content,
    lastEdit: req.body.lastEdit,
  };
  noteModel.create(note, function (err, result) {
    if (err) {
      throw err;
    } else {
      getNotes(res);
    }
  });
});
router.delete("/api/note/:id", function (req, res) {
  if (!req.params.id) {
    res.status(500).send("ID not found");
  } else {
    noteModel.remove(
      {
        _id: req.params.id,
      },
      function (err, result) {
        if (err) {
          throw err;
        } else {
          getNotes(res);
        }
      }
    );
  }
});
router.put("/api/note/update", function (req, res) {
  if (!req.body._id) {
    return;
  }
  var obj = {
    name: req.body.name,
    content: req.body.content,
    lastEdit: req.body.lastEdit,
  };
  noteModel.update(
    { _id: req.body._id },
    {
      name: req.body.name,
      content: req.body.content,
      lastEdit: req.body.lastEdit,
    },
    function (err, result) {
      if (err) throw err;
      getNotes(res);
    }
  );
});
module.exports = router;
