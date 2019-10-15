import React from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import UsernameInput from "./UsernameInput";
import MessageWindow from "./MessageWindow";
import InformationBar from "./InformationBar";
import CurrentRoomInfo from "./CurrentRoomInfo";
import RoomsBar from "./RoomsBar";
import ConnectedUsers from "./ConnectedUsers";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
`;

const server = process.env.REACT_APP_SERVER;
const socket = socketIOClient(server);
class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: [],
      isTyping: false,
      typingSocket: false,
      timeout: undefined,
      connectionInformation: "",
      chatRooms: ["general", "room1", "room2"],
      currentRoom: "general"
    };
  }

  componentDidMount = () => {
    this.setState({
      username: this.props.nickname
    });
    const username = this.props.nickname;
    console.log("komponent załadowany");
    console.log(username);
    socket.emit("adduser", this.props.nickname, this.state.currentRoom);
    socket.on("updatechat", (username, data) => {
      console.log(`${data}`);
      this.setState({
        connectionInformation: data
      });
      socket.emit("GET_ROOM_USERS", this.state.currentRoom);
    });

    socket.on("RECEIVE_MESSAGE", data => {
      console.log(`receive message`);
      console.log(data);
      this.handleUpdateAddMessage(data);
    });
  };

  handleUpdateAddMessage = props => {
    console.log(`dodano message do tablicy`);
    this.setState({
      messages: [...this.state.messages, props],
      backInfo: ""
    });
  };

  handleClearMessage = () => {
    this.setState({
      message: ""
    });
  };

  handleUpdateTyping = props => {
    console.log(`update typing props: ${props}`);
    console.log("update pisania");
    this.setState({
      typingSocket: props
    });
  };

  handleUpdateNotTyping = props => {
    console.log(`ustawiam pisanie na false`);
    this.setState({
      typingSocket: props
    });
  };

  handleUpdateInputChanges = props => {
    this.setState({
      message: props
    });
  };

  handleUpdateIsTyping = props => {
    this.setState({
      isTyping: props
    });
  };

  handleUpdateTimeout = props => {
    this.setState({
      timeout: props
    });
  };

  handleUpdateUsername = props => {
    this.setState({
      username: props
    });
  };

  handleUpdateActiveChatroom = props => {
    console.log(`active chat: ${props}`);
    this.setState(
      {
        currentRoom: props
      },
      () => {
        socket.emit("GET_ROOM_USERS", this.state.currentRoom);
      }
    );
    socket.emit("switchRoom", props, this.state.username);
    console.log(`VIEW_CONNECTED_USERS in switchRoom`);
    socket.emit("GET_ROOM_USERS", this.state.currentRoom);
    console.log(`after emit GET_ROOM_USERS`);
  };

  render() {
    return (
      <Background>
        <div>
          <div>Global Chat</div>
          <RoomsBar
            handleUpdateActiveChatroom={this.handleUpdateActiveChatroom}
            chatRooms={this.state.chatRooms}
          />
          <CurrentRoomInfo currentRoom={this.state.currentRoom} />
          <hr />
          <MessageWindow />
          <div>
            {this.state.messages.map(message => {
              return (
                <div>
                  {message.author}: {message.message}
                </div>
              );
            })}
          </div>
          <p>{this.state.typingSocket ? `Someone is typing ...` : null}</p>
        </div>
        <div>
          <UsernameInput
            username={this.state.username}
            updateUsername={this.handleUpdateUsername}
          />
          <br />
          <Message
            socket={this.state.socket}
            value={this.state.message}
            sendMessage={this.sendMessage}
            currentRoom={this.state.currentRoom}
            onKeyDownNotEnter={this.onKeyDownNotEnter}
            handleUpdateInputChanges={this.handleUpdateInputChanges}
            clearMessage={this.handleClearMessage}
            username={this.state.username}
            message={this.state.message}
            handleUpdateTyping={this.handleUpdateTyping}
            handleUpdateNotTyping={this.handleUpdateNotTyping}
            handleUpdateAddMessage={this.handleUpdateAddMessage}
            isTyping={this.state.isTyping}
            handleUpdateIsTyping={this.handleUpdateIsTyping}
            handleUpdateTimeout={this.handleUpdateTimeout}
            timeoutValue={this.state.timeout}
          />
          <InformationBar
            connectionInformation={this.state.connectionInformation}
          />
          <br />
          <button onClick={this.sendMessage}>Send</button>
        </div>
        <div>
          <ConnectedUsers
            key={ConnectedUsers}
            username={this.state.username}
            currentRoom={this.state.currentRoom}
          />
        </div>
      </Background>
    );
  }
}

export default Chat;
