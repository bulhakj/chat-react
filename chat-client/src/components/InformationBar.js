import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000");

class InformationBar extends React.Component {
  state = {
    informationContent: ""
  };

  componentDidMount = () => {
    socket.on("updatechat", (username, data) => {
      console.log(`wbiłeś na chat ${username}, ${data}`);
    });
  };

  render() {
    return <div>{this.props.connectionInformation}</div>;
  }
}

export default InformationBar;
