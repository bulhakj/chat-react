import React from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import SendMessageButton from "./SendMessageButton";
import UsernameInput from "./UsernameInput";
import MessageWindow from "./MessageWindow";

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
      timeout: undefined
    };

    socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data],
        backInfo: ""
      });
      console.log(this.state.messages);
    };

    this.sendMessage = e => {
      e.preventDefault();
      socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }

  componentDidMount() {
    socket.on("typing", () => {
      this.setState({
        typingSocket: true
      });
    });

    socket.on("nottyping", () => {
      this.setState({
        typingSocket: false
      });
    });
  }

  handleUpdateInputChanges = props => {
    this.setState({
      message: props,
      isTyping: true
    });
  };

  timeoutFunction = () => {
    this.setState({
      isTyping: false
    });
    socket.emit("nottyping");
  };

  onKeyDownNotEnter = () => {
    if (this.state.isTyping === false) {
      this.setState({
        isTyping: true,
        timeout: setTimeout(this.timeoutFunction, 5000)
      });
    } else {
      socket.emit("typing");
      clearTimeout(this.state.timeout);
      this.setState({ timeout: setTimeout(this.timeoutFunction, 1200) });
    }
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
          <UsernameInput updateUsername={this.handleUpdateUsername} />
          <br />
          <Message
            value={this.state.message}
            sendMessage={this.sendMessage}
            onKeyDownNotEnter={this.onKeyDownNotEnter}
            handleUpdateInputChanges={this.handleUpdateInputChanges}
          />
          <br />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
