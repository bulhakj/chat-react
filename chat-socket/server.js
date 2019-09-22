var express = require("express");
var socket = require("socket.io");

var app = express();
var PORT = 5000;
server = app.listen(PORT, function() {
  console.log(`server is running on port ${PORT}`);
});

var rooms = ["general", "room1", "room2"];
var usernames = {};

io = socket(server);

io.on("connection", socket => {
  console.log(`connected user with id: ${socket.id}`);

  socket.on("adduser", username => {
    console.log(username);
    //store the username in socket session for this client

    // socket.username = username;
    // console.log(`socket username = ${socket.username}`);
    // console.log(usernames);

    //store the room name in the socket session for this client
    socket.room = "general";
    console.log(`socket room: ${socket.room}`);
    // add the client's username to the global list
    // usernames[String(username)] = socket.id;
    // send client to the room general
    socket.join("general");
    //echo to client they've connected
    socket.emit("updatechat", "SERVER", "you have connected to general room.");
    // echo to general that a person has connected to their room
    socket.broadcast
      .to("general")
      .emit("updatechat", "SERVER", username + " has connected to this room.");
    socket.emit("updaterooms", rooms, "general");
  });

  socket.on("VIEW_CONNECTED_USERS", (username, currentRoom) => {
    if (username !== "") {
      console.log(username);
      socket.username = username;
      console.log("this usernames ", this.usernames);
      usernames[String(username)] = socket.id;
      console.log(usernames);
      console.log(currentRoom);
      socket.emit("VIEW_CONNECTED_USERS", usernames, currentRoom);
    }
  });

  // when the client emits 'sendchat' this listens and executes
  socket.on("switchRoom", newroom => {
    //leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, recieved as function parameter
    socket.join(newroom);
    socket.emit(
      "updatechat",
      "SERVER",
      socket.username + " has left this room."
    );
    //update socket session room title
    socket.room = newroom;
    socket.broadcast
      .to(newroom)
      .emit("updatechat", "SERVER", socket.username + " has joined this room.");
    socket.emit("updaterooms", rooms, newroom);
  });

  socket.on("disconnect", () => {
    console.log(`disonnected user with id: ${socket.id}`);
    //remove the username from< global usernames list
    delete usernames[socket.username];
    //update list of users in chat, client-side
    io.sockets.emit("updateusers", usernames);
    //echo globally that this client has left
    socket.broadcast.emit(
      "updatechat",
      "SERVER",
      socket.username + " has disconnected."
    );
    socket.leave(socket.room);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data.currentRoom);
    console.log("pisze");
    console.log(data);
    console.log(socket.id);
    console.log(socket.rooms);
    //checking length of users to know if users are in the same room
    io.in(data.currentRoom).clients(function(error, clients) {
      var numClients = clients.length;
      var testClients = clients;
      console.log(numClients);
      console.log(testClients);
      // let user = usernames["qwe"];
      // console.log(user);
    });
  });

  socket.on("nottyping", data => {
    socket.broadcast.emit("nottyping", data);
    console.log("nie pisze");
  });

  socket.on("SEND_MESSAGE", function(data) {
    console.log(data);
    socket.to(data.currentRoom).emit("RECEIVE_MESSAGE", data);
  });
});
