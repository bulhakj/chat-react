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

    // socket.on("RECEIVE_MESSAGE", function(data) {
    //   addMessage(data);
    // });

    // const addMessage = data => {
    //   console.log(data);
    //   this.setState({
    //     messages: [...this.state.messages, data],
    //     backInfo: ""
    //   });
    // };

    // const handleUpdateAddMessage = props => {
    //   this.setState({
    //     messages: [...this.state.messages, props],
    //     backInfo: ""
    //   });
    // };

    //   this.sendMessage = e => {
    //     e.preventDefault();
    //     socket.emit("SEND_MESSAGE", {
    //       author: this.state.username,
    //       message: this.state.message
    //     });
    //     this.setState({ message: "" });
    //   };
  }

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

  //
  // handleUpdateTimeoutFunction = props => {
  //   this.setState({
  //     isTyping: props
  //   });
  //   socket.emit("nottyping");
  // };

  //
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

  // timeoutFunction = () => {
  //   this.setState({
  //     isTyping: false
  //   });
  //   socket.emit("nottyping");
  // };

  // onKeyDownNotEnter = () => {
  //   if (this.state.isTyping === false) {
  //     this.setState({
  //       isTyping: true,
  //       timeout: setTimeout(this.timeoutFunction, 5000)
  //     });
  //   } else {
  //     socket.emit("typing");
  //     clearTimeout(this.state.timeout);
  //     this.setState({ timeout: setTimeout(this.timeoutFunction, 1200) });
  //   }
  // };

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
          <br />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
