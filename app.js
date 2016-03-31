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

    socket.on('user_connect', function(data){
      for(client in clients){
        if(client == data['user']){
          id_connect = clients[client].id
        }
      }
      info_connect = {user:socket.username, divisor:data['divisor']}
      io.sockets.socket(id_connect).emit('ok_connect', info_connect);
    });

    socket.on('send_message', function(data){
      for(client in clients){
        if(client == data['user']){
          id_connect = clients[client].id
        }
      }
      io.sockets.socket(id_connect).emit('receive_message', data['message']);
    });


});
