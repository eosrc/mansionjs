var SessionSockets = require('session.socket.io');
var sessionSockets;

exports.ssio = function(options) {

  sessionSockets = new SessionSockets(options.svr, options.store, options.parser);
  location = options.location;

sessionSockets.on('connection', function (err, socket, session) {
  socket.on('clientMsg', function(content) {
    socket.emit('serverMsg', 'You said: ' + content);

    //socket.get('username', function(err, username) {
      if (session.user) {
        var user = session.user,
        username = user.name; //socket.id;
      //}
      socket.get('room', function(err, room) {
        if (err) { throw err; }
        var broadcast = socket.broadcast;
        var message = content;
        if (session.room) {
          //var r = session.room.slice(1,session.room.length);
          broadcast.to(room);
          console.log('broadcast to room: ' + session.room);
        }
        broadcast.emit('serverMsg', username + ' said: ' + message);
      });
      }
    //});
  });

  socket.on('login', function(username) {
    socket.set('username', username, function(err) {
      if (err) { throw err; }
      socket.emit('serverMsg', 'Currently logged in as ' + username);
      socket.broadcast.emit('serverMsg', 'User ' + username +
        ' logged in');
    });    
  });

  

  socket.on('disconnect', function() {
    //socket.get('username', function(err, username) {
      if (session && session.user) {
        var user = session.user,
        username = user.name; //socket.id;
        delete location[user.name];
      //}
      socket.broadcast.emit('serverMsg', 'User ' + username +
        ' disconnected');
    }
  });

  socket.on('go', function(room) {
    //socket.get('room', function(err, oldRoom) {
      //if (err) { throw err; }
      socket.set('room', room, function(err) {
        if (err) { throw err; }
        console.log('inside set room where room is ' + room);
        //var r = room.slice(1,room.length);
        socket.join(room);
        var oldRoom = session.room;
        if (oldRoom) {
          socket.leave(oldRoom);
        }
        if (session.user) {
          session.room = room;
          session.save();
          console.log('inside set room within session.user ' + session.user.name);
          var user = session.user,
          username = user.name; //socket.id;
          location[username] = room;          
          socket.emit('serverMsg', 'You joined room ' + room);
          socket.broadcast.to(room).emit('serverMsg', 'User ' + 
            username + ' joined this room');
        }
      });
    //});
  });

  socket.on('change', function(args) {
    socket.get('room', function(err, room) {
      if (err) { throw err; }
      var broadcast = socket.broadcast;
      broadcast.to(room);
      broadcast.emit('change', args);
    });
  })
  
  socket.on('who', function() {
    var str = '', room, k;
    if (session.user) {
      room = location[session.user.name];
      //if (room) { 
        for( k in location ) { 
          if (location[k] === room) str += k + '; '; 
        } 
      //}
    }
    //for( k in socket ) {      
    //  console.log( k + ' ' + socket[k]);
    //}
    socket.emit('serverMsg', 'The users in the room are: ' + str);
  });
  
  //socket.on('build', function() {
  //  socket.emit('serverMsg', '>');
  //});

  socket.on('look', function(obj) {
    //socket.get('room', function(err, room) {
      console.log('/look obj where obj, room, and user are: ' + obj + ', ' + session.room + ',' + session.user.name);
      if(err) { throw err; }
      if(obj == session.room) socket.emit('serverMsg', 'You see ' + mansion.look(mansion.rooms[obj]));
    //});
  });

  socket.on('names', function(obj) {
    socket.get('room', function(err, room) {
      console.log('/names obj where obj and room are: ' + obj + ' ' + room);
      if(err) { throw err; }
      if(obj == obj) socket.emit('serverMsg', 'The names are: ' + mansion.names(mansion.rooms[obj]));
    });
  });

//  socket.emit('login');
});

}  
