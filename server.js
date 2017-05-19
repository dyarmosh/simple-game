var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router;

var mainRouter = require('./routes/main.js');

var app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser("kekkokos"));
app.use("/", mainRouter);

app.listen(1488);