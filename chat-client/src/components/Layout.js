import React from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import UsernameInput from "./UsernameInput";
import MessageWindow from "./MessageWindow";
import InformationBar from "./InformationBar";
import CurrentRoomInfo from "./CurrentRoomInfo";
import Emojis from "./Emojis";
import SendButton from "./SendButton";
import RoomsBar from "./RoomsBar";
import ConnectedUsers from "./ConnectedUsers";
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
  width: 20%;
  border: 1px #fff solid;
  background-color: #2c2f33;
  border: none;
  border-radius: 15px 0 0 15px;
`;
const LeftHeader = styled.div`
  padding-left: 2.5rem;
  height: 3.2vw;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 11px -6px #000;
`;
const RoomHeader = styled.h3`
  color: #dadada;
  margin-top: 0;
  margin-bottom: 0;
  height: auto;
  font-weight: 400;
`;
const LeftContentWrapper = styled.div`
  color: #565656;
  text-transform: uppercase;
`;

const RoomsWrapper = styled.div`
  margin-top: 2vw;
`;

const CenterContainer = styled.section`
  width: 60%;
  background-color: #383c41;
`;
const CenterHeader = styled.div`
  height: 3.2vw;
  box-shadow: 0px 4px 11px -6px #000;
  background-color: #383c41;
  text-transform: uppercase;
  color: #dadada;
  font-weight: 400;
  display: flex;
  align-items: center;
`;
const CenterContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 3em);
`;
const InputWrapper = styled.div`
  width: 100%;
  margin-left: 1vw;
  margin-right: 1vw;
  background-color:#4D535B
  border-radius: 4px;
  height: 3vw;
  display: flex;
  align-items: center;
`;
const MessageWrapper = styled.div`
  width: 100%;
  height: 75%;
`;

const SvgWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 10%;
`;
const RightContainer = styled.section`
  width: 20%;
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
      <Background id="background">
        <GlobalStyles />
        <LeftContainer id="left-container">
          <LeftHeader id="left-header">
            <RoomHeader id="room-header">Rooms</RoomHeader>
          </LeftHeader>
          <LeftContentWrapper id="left-content-wrapper">
            <RoomsWrapper id="rooms-wrapper">
              <RoomsBar
                id="rooms-bar"
                handleUpdateActiveChatroom={this.handleUpdateActiveChatroom}
                chatRooms={this.state.chatRooms}
              />
            </RoomsWrapper>
          </LeftContentWrapper>
        </LeftContainer>
        <CenterContainer id="center-container">
          <CenterHeader id="center-header">
            <CurrentRoomInfo
              id="current-room-info"
              currentRoom={this.state.currentRoom}
            />
          </CenterHeader>
          <CenterContentWrapper id="center-content-wrapper">
            <MessageWrapper id="message-wrapper">
              {this.state.messages.map(message => {
                return (
                  <div>
                    {message.author}: {message.message}
                  </div>
                );
              })}
            </MessageWrapper>
            {/* <InformationBar
              id="information-bar"
              connectionInformation={this.state.connectionInformation}
            /> */}
            <InputWrapper id="input-wrapper">
              <p>{this.state.typingSocket ? `Someone is typing ...` : null}</p>

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
              <SvgWrapper>
                <Emojis id="emojis-icon" />
                <SendButton id="send-button" onClick={this.sendMessage} />
              </SvgWrapper>

              {/* <button id="send-button" onClick={this.sendMessage}>
                Send
              </button> */}
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
