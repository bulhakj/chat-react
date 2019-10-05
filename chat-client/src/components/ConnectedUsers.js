import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server);
class ConnectedUsers extends Component {
  state = {
    usersConnected: "",
    currentRoom: this.props.currentRoom
  };

  componentDidMount = () => {
    console.log(`mounted connected users`);
    socket.emit("GET_ROOM_USERS", this.state.currentRoom);
    socket.on("SEND_ROOM_SOCKET_USERS", users => {
      console.log(users);
    });
  };

  render() {
    return (
      <div>
        this is connected user component
        <ul>
          {Object.keys(this.state.usersConnected).map(key => {
            return <li>{key}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ConnectedUsers;
