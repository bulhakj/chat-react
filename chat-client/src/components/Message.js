import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000");

class MessageInput extends React.Component {
  state = {};

  componentDidMount = props => {
    socket.on("typing", props => {
      if (this.props.currentRoom === props) {
        this.props.handleUpdateTyping(true);
        console.log(`odebrano typing`);
      }
    });

    socket.on("nottyping", props => {
      console.log(props);
      if (this.props.currentRoom === props) {
        this.props.handleUpdateNotTyping(false);
        console.log(`odebrano not typing`);
      }
    });

    socket.on("RECEIVE_MESSAGE", username => {
      console.log(`receive message`);
      console.log(username);
      this.props.handleUpdateAddMessage(username);
    });
  };

  timeoutFunction = props => {
    console.log("in timeout");
    this.props.handleUpdateIsTyping(false);
    socket.emit("nottyping", this.props.currentRoom);
  };

  onKeyDownNotEnter = () => {
    if (this.props.isTyping === false) {
      this.props.handleUpdateIsTyping(true);
      var timeout = setTimeout(this.timeoutFunction, 1200);
      console.log(timeout);
      this.props.handleUpdateTimeout(timeout);
    } else {
      socket.emit(
        "typing",
        {
          currentRoom: this.props.currentRoom
        },
        this.state.currentRoom
      );
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
    socket.on("updatechat", function(username, data) {});
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
