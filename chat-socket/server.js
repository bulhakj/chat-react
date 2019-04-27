const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 5000;

const app = express();

//server instance
const server = http.createServer(app);

//creating socket using the instance of the server
const io = socketIO(server);

io.on("connection", socket => {
  console.log("User connected with id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconected with id ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
