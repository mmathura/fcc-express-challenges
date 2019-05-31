
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here

app.use(function middleware(req, res, next){
  // method path - ip
  // GET /json - ::ffff:127.0.0.1
  // req.method req.path req.ip next()
  var msg = req.method + " " + req.path + " - " + req.ip;
  console.log(msg);
  next();
});

// --> 11)  Mount the body-parser middleware  here

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

/** 1) Meet the node console. */

console.log("Hello World");

/** 2) A first working Express Server */

// app.get("/", function(req, res) {
//   res.send('Hello Express');
// });

/** 3) Serve an HTML file */

app.get("/", function(req, res) {
  // absolutePath = __dirname + relativePath/file.ext
  var path = __dirname + "/views/index.html";
  res.sendFile(path);
});

/** 4) Serve static assets  */

// express.static(path)
// app.use(path, middlewareFunction)

app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */

// app.get("/json", function(req, res){
//   // object = {key: data}
//   // res.json(object);
//   // https://fcc-second-currency.glitch.me/json
//   res.json({"message": "Hello json"});
// });

/** 6) Use the .env file to configure the app */

// process.env.VAR_NAME
// VAR_NAME=value

app.get("/json", function(req, res){
  // object = {key: data}
  // res.json(object);
  // https://fcc-second-currency.glitch.me/json
  // res.json({"message": "Hello json"});
  if (process.env.MESSAGE_STYLE == 'uppercase')
    res.json({"message": "HELLO JSON"});
  res.json({"message": "Hello json"});
});
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

// method path - ip
// GET /json - ::ffff:127.0.0.1
// req.method req.path req.ip next()

/** 8) Chaining middleware. A Time server */

// app.get('/now', ...)
// req.time
// new Date().toString()
// {time: req.time}
app.get('/now', function middleware(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

/** 9)  Get input from client - Route parameters */

// req.params object
// GET /:word/echo
// res.json({echo: word})
// req.params.word
// your-app-rootpath/freecodecamp/echo

app.get("/:word/echo", function(req, res){
  res.json({"echo": req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

// req.query
// GET /name
// { name: 'firstname lastname'}
// ?first=firstname&last=lastname
// app.route(path).get(handler).post(handler)
// /name

app.route("/name").get(function(req, res) {
  res.send({"name": req.query.first + " " + req.query.last});
}).post(urlencodedParser, function(req, res){
  req.query.first = req.body.first;
  req.query.last = req.body.last;
  // console.log(req.query);
  res.send({"name": req.query.first + " " + req.query.last});
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

// /name
// req.body
// {name: 'firstname lastname'}

app.post("/name", urlencodedParser, function(req, res){
  res.json({name: req.body.first + " " + req.body.last});
});

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
