var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    clients = {};

server.listen(8000);

app.get('/', function(req, res) {
  res.sendfile(__dirname + 'index.html');
});

io.sockets.on('connection', function(socket) {
  
});
