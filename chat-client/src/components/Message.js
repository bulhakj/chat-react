import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000");

class MessageInput extends React.Component {
  state = {};

  componentDidMount = props => {
    socket.on("typing", () => {
      console.log(`odebrano typing`);
      this.props.handleUpdateTyping(true);
    });

    socket.on("nottyping", () => {
      console.log(`odebrano not typing`);
      this.props.handleUpdateNotTyping(false);
    });

    socket.on("RECEIVE_MESSAGE", username => {
      console.log(`receive message`);
      console.log(username);
      this.props.handleUpdateAddMessage(username);
    });
  };

  timeoutFunction = () => {
    console.log("in timeout");
    this.props.handleUpdateIsTyping(false);
    socket.emit("nottyping");
  };

  onKeyDownNotEnter = () => {
    if (this.props.isTyping === false) {
      this.props.handleUpdateIsTyping(true);
      var timeout = setTimeout(this.timeoutFunction, 1200);
      console.log(timeout);
      this.props.handleUpdateTimeout(timeout);
    } else {
      socket.emit("typing");
      console.log("timeout to clear", this.props.timeoutValue);
      clearTimeout(this.props.timeoutValue);
      this.props.handleUpdateTimeout(setTimeout(this.timeoutFunction, 1200));
    }
  };

  handleEnterSend = e => {
    if (e.key === "Enter") {
      this.sendMessage(e);
    }
  };

  sendMessage = e => {
    socket.on("updatechat", function(username, data) {
      // $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
    });
    e.preventDefault();
    socket.emit(
      "SEND_MESSAGE",
      {
        author: this.props.username,
        message: this.props.message,
        currentRoom: this.props.currentRoom
      },
      this.state.currentRoom
    );
    this.props.clearMessage();
  };

  render() {
    return (
      <input
        value={this.props.value}
        type="text"
        placeholder="Type your message here"
        onChange={event => {
          console.log(event.target.value);
          this.props.handleUpdateInputChanges(event.target.value);
          this.onKeyDownNotEnter();
        }}
        onKeyUp={this.handleEnterSend}
      />
    );
  }
}
export default MessageInput;
