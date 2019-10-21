import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(process.env.REACT_APP_SERVER, { secure: true });

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
