hash = require('./pass').hash

var users = {
  brd: { name: 'brd' },
};

hash('dummy', function(err, salt, hash){
  if (err) throw err;
  users.brd.salt = salt;
  users.brd.hash = hash;
});

hash('dummy', function(err, salt, hash){
  if (err) throw err;
  for(i = 0; i < 127; i++ ) { 
    var s = 'guest'+i.toString(); 
    users[s] = { name: s }; 
    users[s].salt = salt;
    users[s].hash = hash;
  }
});

exports.users = users;

exports.users.authenticate = function(name, pass, fn) {
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash(pass, user.salt, function(err, hash){
    if (err) return fn(err);
    if (hash == user.hash) return fn(null, user);
    fn(new Error('invalid password'));
  })
}

