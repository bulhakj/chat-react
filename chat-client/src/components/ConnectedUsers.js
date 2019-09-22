import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server);
let connectedUsers;
class ConnectedUsers extends Component {
  state = {
    usersConnected: ""
  };

  componentDidUpdate = (props, state) => {
    console.log("props: ", props);
    console.log("state: ", state);

    console.log(`connected users - MOUNTED`);
    if (props.username !== "") {
      socket.emit("VIEW_CONNECTED_USERS", props.username, props.currentRoom);
    }
    socket.on("VIEW_CONNECTED_USERS", (usernames, currentRoom) => {
      if (currentRoom === props.currentRoom) {
        console.log("usernames", usernames);
        this.connectedUsers = usernames;
        console.log("connected users inside", this.connectedUsers);
        // if (this.state.usersConnected !== this.connectedUsers) {
        //   this.setState({
        //     usersConnected: this.connectedUsers,
        //   });
        // }
      }
    });
  };

  render() {
    return <div>This is ConnectedUsers component</div>;
  }
}

export default ConnectedUsers;
