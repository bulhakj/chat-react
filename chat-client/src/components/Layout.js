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
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Background = styled.div`
  height: 80.75vh;
  width: 93.75vw;
  display: flex;
`;

const LeftContainer = styled.section`
  width: 15%;
  border: 1px #fff solid;
  background-color: #2c2f33;
  border: none;
  border-radius: 15px 0 0 15px;
`;
const LeftHeader = styled.div`
  padding-left: 2.5rem;
  height: 3vw;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 11px -6px #000;
`;
const RoomHeader = styled.h3`
  color: #dadada;
  margin-top: 0;
  margin-bottom: 0;
  height: auto;
`;
const LeftContentWrapper = styled.div`
  color: #565656;
  text-transform: uppercase;
`;

const RoomsWrapper = styled.div`
  margin-top: 2vw;
`;
const CenterContainer = styled.section`
  width: 70%;
  border: 1px #fff solid;
`;
const CenterHeader = styled.div``;
const CenterContentWrapper = styled.div``;
const InputWrapper = styled.div``;
const MessageWrapper = styled.div``;
const RightContainer = styled.section`
  width: 15%;
  border: 1px #fff solid;
`;
const RightHeader = styled.div``;
const RightContentWrapper = styled.div``;
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
        <GlobalStyles />
        <LeftContainer>
          <LeftHeader>
            <RoomHeader>Rooms</RoomHeader>
          </LeftHeader>
          <LeftContentWrapper>
            <RoomsWrapper>
              <RoomsBar
                handleUpdateActiveChatroom={this.handleUpdateActiveChatroom}
                chatRooms={this.state.chatRooms}
              />
            </RoomsWrapper>
          </LeftContentWrapper>
        </LeftContainer>
        <CenterContainer>
          <CenterHeader>
            <CurrentRoomInfo currentRoom={this.state.currentRoom} />
          </CenterHeader>
          <CenterContentWrapper>
            <div>
              {this.state.messages.map(message => {
                return (
                  <div>
                    {message.author}: {message.message}
                  </div>
                );
              })}
            </div>
            <InformationBar
              connectionInformation={this.state.connectionInformation}
            />
            <InputWrapper>
              <p>{this.state.typingSocket ? `Someone is typing ...` : null}</p>
              <MessageWrapper>
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

                <button onClick={this.sendMessage}>Send</button>
              </MessageWrapper>
            </InputWrapper>
            {/* <UsernameInput
            username={this.state.username}
            updateUsername={this.handleUpdateUsername}
          /> */}
          </CenterContentWrapper>
        </CenterContainer>
        <RightContainer>
          <RightHeader></RightHeader>
          <RightContentWrapper>
            <div>
              <ConnectedUsers
                key={ConnectedUsers}
                username={this.state.username}
                currentRoom={this.state.currentRoom}
              />
            </div>
          </RightContentWrapper>
        </RightContainer>
        {/* <div>
          <div>Global Chat</div>

          <hr />
          <MessageWindow />
        </div>
        <div>
          <br />

          <br />
        </div> */}
      </Background>
    );
  }
}

export default Chat;
