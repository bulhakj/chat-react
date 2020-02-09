import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import OnlineDot from "../static/images/online-dot.svg";

const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server, { secure: true });

const ConnectedUsersWrapper = styled.div`
  height: 100%;
`;
const ConnectedUsersSection = styled.section`
  padding-left: 1.6vw;
  @media screen and (max-width: 576px) {
    padding-left: 4.6vw;
    padding-top: 2vw;
  }
`;

const ConnectedUser = styled.div`
  padding-top: 1.6vw;
  color: #565656;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  @media screen and (max-width: 576px) {
    font-size: 1.3rem;
  }
`;

const Dot = styled.img`
  padding-right: 0.7vw;
  height: 1vw;
  @media screen and (max-width: 576px) {
    height: 3vw;
    padding-right: 2vw;
  }
`;
class ConnectedUsers extends Component {
  state = {
    usersConnected: ""
  };

  componentDidMount = () => {
    this.timer = setTimeout(() => {
      socket.emit("GET_ROOM_USERS", this.props.currentRoom);
      socket.on("SEND_ROOM_SOCKET_USERS", users => {
        this.setState({
          usersConnected: users
        });
      });
    }, 1500);
    this.checkUsers = setInterval(() => {
      socket.emit("GET_ROOM_USERS", this.props.currentRoom);
    }, 1500);
  };

  render() {
    return (
      <ConnectedUsersWrapper id="connected-users-wrapper">
        <ConnectedUsersSection id="connected-users-section">
          {Object.keys(this.state.usersConnected).map((item, i) => {
            if (
              this.state.usersConnected[item].room == this.props.currentRoom
            ) {
              return (
                <ConnectedUser id="connected-user" key={i}>
                  <Dot id="dot" src={OnlineDot}></Dot>
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
