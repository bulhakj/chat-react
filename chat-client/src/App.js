import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import NicknameScreen from "./components/NicknameScreen";
import styled from "styled-components";
import Chat from "./components/Layout";
import Login from "./components/NicknameScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

class App extends Component {
  state = {
    isNickname: false,
    nickname: ""
  };

  // handleUpdateNickname = props => {
  //   this.setState(
  //     {
  //       isNickname: true,
  //       nickname: props
  //     },
  //     () => {
  //       const { isNickname, nickname } = this.state;
  //       localStorage.setItem("isNickname", isNickname);
  //       localStorage.setItem("nickname", nickname);
  //     }
  //   );
  // };

  render() {
    return (
      <section>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/chat" component={withRouter(Chat)} />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
