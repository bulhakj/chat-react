import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server);
class ConnectedUsers extends Component {
  state = {
    usersConnected: ""
    // currentRoom: this.props.currentRoom
  };

  componentDidMount = () => {
    console.log(`mounted connected users`);
    this.timer = setTimeout(() => {
      socket.emit("GET_ROOM_USERS", this.props.currentRoom);
      socket.on("SEND_ROOM_SOCKET_USERS", users => {
        console.log("USERS IN CONNECTED USERS, ", users);
        this.setState({
          usersConnected: users
        });
      });
    }, 1000);
    this.checkUsers = setInterval(() => {
      socket.emit("GET_ROOM_USERS", this.props.currentRoom);
    }, 1000);
  };

  render() {
    return (
      <div>
        this is connected user component
        <ul>
          {Object.keys(this.state.usersConnected).map((item, i) => {
            if (
              this.state.usersConnected[item].room == this.props.currentRoom
            ) {
              return (
                <li key={i}>{this.state.usersConnected[item].nickname}</li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ConnectedUsers;
