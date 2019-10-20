import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import OnlineDot from "../static/images/online-dot.svg";

const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server);

const ConnectedUsersWrapper = styled.div`
  height: 100%;
`;
const ConnectedUsersSection = styled.section`
  padding-left: 1.6vw;
`;

const ConnectedUser = styled.div`
  padding-top: 1.6vw;
  color: #565656;
  font-size: 0.9vw;
  display: flex;
  align-items: center;
`;

const Dot = styled.img`
  padding-right: 0.7vw;
  height: 1vw;
`;
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
      <ConnectedUsersWrapper>
        <ConnectedUsersSection>
          {Object.keys(this.state.usersConnected).map((item, i) => {
            if (
              this.state.usersConnected[item].room == this.props.currentRoom
            ) {
              return (
                <ConnectedUser key={i}>
                  <Dot src={OnlineDot}></Dot>
                  {this.state.usersConnected[item].nickname}
                </ConnectedUser>
              );
            }
          })}
        </ConnectedUsersSection>
      </ConnectedUsersWrapper>
    );
  }
}

export default ConnectedUsers;
