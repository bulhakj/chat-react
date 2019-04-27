import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import Layout from "./components/Layout";

class App extends Component {
  state = {
    endpoint: "http://localhost:5000/",
    color: "white"
  };

  componentDidMount = () => {
    //sending sockets
    const sendingSockets = socketIOClient(this.state.endpoint);
  };

  render() {
    return (
      <div>
        <p>Making sure this works</p>
        <Layout title="This is the Layout" />
      </div>
    );
  }
}

export default App;
