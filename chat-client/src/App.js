import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";

class App extends Component {
  // state = {
  //   endpoint: "http://localhost:5000/"
  // };

  render() {
    return (
      <div>
        <Layout title="This is the Layout" />
      </div>
    );
  }
}

export default App;
