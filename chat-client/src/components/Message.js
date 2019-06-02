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

    socket.on("RECEIVE_MESSAGE", data => {
      console.log(data);
      this.props.handleUpdateAddMessage(data);
    });
  };

  timeoutFunction = () => {
    console.log("in timeout");
    this.props.handleUpdateIsTyping(false);
    socket.emit("nottyping");
  };

  onKeyDownNotEnter = () => {
    if (this.props.isTyping === false) {
      console.log("in false");
      this.props.handleUpdateIsTyping(true);
      var timeout = setTimeout(this.timeoutFunction, 1200);
      console.log(timeout);
      this.props.handleUpdateTimeout(timeout);
      // socket.emit("typing");
    } else {
      console.log("in false");
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
    e.preventDefault();
    socket.emit("SEND_MESSAGE", {
      author: this.props.username,
      message: this.props.message
    });
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
