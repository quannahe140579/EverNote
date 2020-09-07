var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongose = require("mongoose");
var config = require("./config");
var router = require("./routes/index");
var flash = require('req-flash');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(session({ secret: '123' }));
app.use(flash());
app.use("/",router);

app.set("view engine","ejs");

mongose.connect(config.getDbConnectionString(),{useUnifiedTopology: true},function(err){
  if(err){
    console.log("Fail to connect");
  }else{
    console.log("Connect succsess")
  }
});

app.get("/", function(req, res){
  res.render("login.ejs",{error: ""})
})

app.listen(port, function(err){
  if(err) throw err;
  console.log("Server is listenning on port " + port);
})