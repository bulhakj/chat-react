import React from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = "emojione";
// set the storage location for all emojis
jsemoji.img_sets.emojione.path =
  "https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";

const socket = socketIOClient(process.env.REACT_APP_SERVER, { secure: true });

const InputMessage = styled.input`
  padding-left: 1vw;
  width: 88%;
  border: none;
  border-radius: 4px;
  height: 100%;
  background-color: #4d535b;
  padding-top: 0;
  padding-bottom: 0;
  outline: none;
  color: #fbfbfb;
`;
class MessageInput extends React.Component {
  state = {
    sendMouseMessage: this.props.sendMouseMessage,
    message: ""
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.sendMouseMessage);
    console.log(prevProps.sendMouseMessage);
    console.log(this.props.sendMouseMessage);
    if (
      prevProps.sendMouseMessage !== true &&
      this.props.sendMouseMessage == true
    ) {
      this.handleSendOnClickMouseMessage();
      this.props.handleSendMouseBtnMessage(false);
    }
  }

  componentDidMount = () => {
    this.setState({
      message: this.props.value
    });
  };

  handleSendOnClickMouseMessage = () => {
    socket.on("updatechat", function(username, data) {});
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
  componentDidMount = props => {
    console.log(this.props.socket);
    socket.on("typing", serverRoom => {
      if (this.props.currentRoom === serverRoom) {
        this.props.handleUpdateTyping(true);
        console.log(`odebrano typing`);
      }
    });

    socket.on("nottyping", serverRoom => {
      if (this.props.currentRoom === serverRoom) {
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
      this.setState({
        message: ""
      });
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

  // handleEmojiClick = e => {
  // let emojiPic = jsemoji.replace_colons(`:${emoji.name}:`);
  // let emojiPic = e.native;
  // console.log(emojiPic);
  // console.log(e);
  // this.setState({
  //   message: this.state.message + emojiPic
  // });
  // };
  addEmoji = e => {
    console.log(e.native);
    this.setState({
      message: this.state.message + e.native
    });
  };

  render() {
    return (
      <div>
        <InputMessage
          value={this.state.message}
          type="text"
          placeholder="Type your message here"
          onChange={event => {
            console.log(event.target.value);
            this.props.handleUpdateInputChanges(this.state.message);
            this.onKeyDownNotEnter();
            this.setState({
              message: event.target.value
            });
          }}
          onKeyUp={this.handleEnterSend}
        />
        {/* <EmojiPicker onEmojiClick={this.handleEmojiClick} />*/}
        <span>
          <Picker onSelect={this.addEmoji} />
        </span>
      </div>
    );
  }
}
export default MessageInput;
