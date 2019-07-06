import React from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import SendMessageButton from "./SendMessageButton";
import UsernameInput from "./UsernameInput";
import MessageWindow from "./MessageWindow";
import InformationBar from "./InformationBar";
import CurrentRoomInfo from "./CurrentRoomInfo";

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
      currentRoom: "general"
    };
  }

  componentDidMount = () => {
    console.log("komponent załadowany");
    const username = prompt("podaj swój nick");
    this.setState({
      username: username
    });
    console.log(username);
    socket.emit("adduser", username);
    socket.on("updatechat", (username, data) => {
      console.log(`${data}`);
      this.setState({
        connectionInformation: data
      });
    });
  };

  handleUpdateAddMessage = props => {
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
      // isTyping: true
    });
  };

  handleUpdateIsTyping = props => {
    this.setState({
      isTyping: props
      // timeout: props
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

  render() {
    return (
      <div>
        <div>
          <div>Global Chat</div>
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
      </div>
    );
  }
}

export default Chat;
