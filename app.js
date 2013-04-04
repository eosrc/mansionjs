var express = require('express')
  , connect = require('connect')
  , mansion = require('./public/scripts/jquery.mansion').mansion
  , routes = require('./routes/index')(mansion)
  , http = require('http')
  , path = require('path')
  , state = {}
  , users = require('./data/users').users;

var app = express();

var cookieParser = express.cookieParser('shhhh, very secret');
var sessionStore = new connect.middleware.session.MemoryStore();

  state.location = {}
  state.users = []

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(cookieParser);
  app.use(express.session({ store: sessionStore }));
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function restrict(req, res, next) {
  if (req.session.user) {
    req.session.room = req.url;
    console.log(req.url);
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/enter');
  }
}

app.get('/restricted', restrict, function(req, res){
  res.sendfile(__dirname + '/public/main.html');
});

app.get('/leave', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
  // should delete from state.users if not done already
});

app.get('/enter', function(req, res){
  res.sendfile(__dirname + '/public/enter.html');
});

app.post('/enter', function(req, res){
  users.authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation 
      req.session.regenerate(function(){
        // Store the user's primary key 
        // in the session store to be retrieved,
        // or in this case the entire user object
        state.location[user.name] = '';
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('/restricted');
      });
      state.users.push(user);
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "brd" and "dummy")';
      res.redirect('/enter');
    }
  });
});

app.get('/', function(req, res) {
  res.sendfile( __dirname + '/public/index.html' );
});

app.get('/garden', function(req, res) {
  res.sendfile( __dirname + '/public/garden.html' );
});

app.get('/mush', function(req, res) {
  res.sendfile( __dirname + '/public/mush_.html' );
});

app.get('/main', restrict, routes.main);
app.get('/chapel', restrict, routes.chapel);
app.get('/lab', restrict, routes.lab);
app.get('/library', restrict, routes.library);
app.get('/living', restrict, routes.living);
app.get('/room', restrict, routes.room);
app.get('/conference', restrict, routes.conference);
app.get('/office', restrict, routes.office);

var port = app.get('port');
var httpd = http.createServer(app).listen(port, function(){
  console.log("Mansion is ready listening on port " + port);
});

var io = require('socket.io').listen(httpd);

var ssio = require('./mush').ssio;
ssio( {svr:io, store: sessionStore, parser: cookieParser, state: state });

