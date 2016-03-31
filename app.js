var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    clients = {};

server.listen(8000);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  socket.on('new user', function(data, callback) {
      if(data in clients){
        callback(false);
      }else{
        socket.username = data;
        clients[socket.username] = {id:socket.id, connect:false};
        callback(true);
        updateUsernames();
      }
    });

    socket.on('disconnect', function(data) {
        if(!socket.username) return;
        delete clients[socket.username];
        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('usernames', clients);
    }
});
