var io = require('socket.io')().listen(30000);

io.on('connection', function(socket) {
  socket.on('chat', function(data) {
    var msg = {
      name : data.name,
      msg: data.msg
    };
    io.sockets.emit("chat", msg);
  });
});
////