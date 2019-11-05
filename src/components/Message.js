import React from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
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

const InputMessageWrapper = styled.div`
  width: 89%;
  @media screen and (max-width: 576px) {
    width: 83%;
  }
`;

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
  @media screen and (max-width: 576px) {
    margin-left: 3vw;
  }
`;
class MessageInput extends React.Component {
  state = {
    sendMouseMessage: this.props.sendMouseMessage,
    message: "",
    displayEmojiPicker: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sendMouseMessage !== true &&
      this.props.sendMouseMessage == true &&
      this.state.message !== ""
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
    this.setState({
      message: ""
    });
  };
  componentDidMount = props => {
    socket.on("typing", serverRoom => {
      if (this.props.currentRoom === serverRoom) {
        this.props.handleUpdateTyping(true);
      }
    });

    socket.on("nottyping", serverRoom => {
      if (this.props.currentRoom === serverRoom) {
        this.props.handleUpdateNotTyping(false);
      }
    });

    socket.on("RECEIVE_MESSAGE", username => {
      this.props.handleUpdateAddMessage(username);
    });
  };

  timeoutFunction = props => {
    this.props.handleUpdateIsTyping(false);
    socket.emit("nottyping", this.props.currentRoom);
  };

  onKeyDownNotEnter = () => {
    if (this.props.isTyping === false) {
      this.props.handleUpdateIsTyping(true);
      let timeout = setTimeout(this.timeoutFunction, 1200);
      this.props.handleUpdateTimeout(timeout);
    } else {
      socket.emit(
        "typing",
        {
          currentRoom: this.props.currentRoom
        },
        this.state.currentRoom
      );
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
    if (this.state.message !== "") {
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
    }
  };

  addEmoji = e => {
    this.setState(
      {
        message: this.state.message + e.native
      },
      () => {
        this.props.handleUpdateInputChanges(this.state.message);
      }
    );
  };

  render() {
    return (
      <InputMessageWrapper id="input-message-wrapper">
        <InputMessage
          id="input-message"
          value={this.state.message}
          type="text"
          placeholder="Type your message here"
          onChange={event => {
            this.props.handleUpdateInputChanges(this.state.message);
            this.onKeyDownNotEnter();
            this.props.handleSendMouseBtnMessage(false);
            this.setState(
              {
                message: event.target.value
              },
              () => {
                this.props.handleUpdateInputChanges(this.state.message);
              }
            );
          }}
          onKeyUp={this.handleEnterSend}
        />
        {this.props.isEmojiOpen === true && (
          <Picker
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
            onSelect={this.addEmoji}
          />
        )}
      </InputMessageWrapper>
    );
  }
}
export default MessageInput;
