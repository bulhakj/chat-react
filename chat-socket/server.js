var express = require("express");
var socket = require("socket.io");

var app = express();
var PORT = 5000;
server = app.listen(PORT, function() {
  console.log(`server is running on port ${PORT}`);
});

io = socket(server);

io.on("connection", socket => {
  console.log(`connected user with id: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disonnected user with id: ${socket.id}`);
  });

  socket.on("typing", user => {
    socket.broadcast.emit("typing", user);
    console.log("pisze");
  });

  socket.on("nottyping", user => {
    socket.broadcast.emit("nottyping", user);
    console.log("nie pisze");
  });

  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
