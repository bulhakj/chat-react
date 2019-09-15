import React from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import SendMessageButton from "./SendMessageButton";
import UsernameInput from "./UsernameInput";
import MessageWindow from "./MessageWindow";
import InformationBar from "./InformationBar";
import CurrentRoomInfo from "./CurrentRoomInfo";
import RoomsBar from "./RoomsBar";
import ConnectedUsers from "./ConnectedUsers";

const socket = socketIOClient("http://localhost:5000");
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
    socket.emit("adduser", username);
    socket.on("updatechat", (username, data) => {
      console.log(`${data}`);
      this.setState({
        connectionInformation: data
      });
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
    this.setState({
      currentRoom: props
    });
    socket.emit("switchRoom", props);
  };

  render() {
    return (
      <div>
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
          <ConnectedUsers />
        </div>
      </div>
    );
  }
}

export default Chat;
