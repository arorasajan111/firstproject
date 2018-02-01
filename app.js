var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('basic-auth')
var http = require('http')
var oauthserver = require('oauth2-server');
var fs=require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var paypal = require('./routes/paypal');

var app = express();
var reviewsCrawler = require('amazon-reviews-crawler')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(express.static(__dirname + '/public'))
process.on('uncaughtException', function(err) {
    // handle the error safely
  var file = __dirname + "/routes/error.txt"
  fs.appendFile(file, err,function (err) {        
  });
  //next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
app.listen(3020,function(){
  console.log("It's Started on PORT 3020");
});


// app.use('/auth',function(req, res, next) {   
//   var user = auth(req);
//   if (!user || user.name !== 'john' || user.pass !== 'secret') {
//     res.statusCode = 401
//     res.setHeader('WWW-Authenticate', 'Basic realm="john"')
//     res.end('Access denied')
//   }else{ 
//     next();
//   }
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
wfdweqfewf