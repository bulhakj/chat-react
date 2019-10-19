import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import NicknameScreen from "./components/NicknameScreen";
import styled from "styled-components";
import Chat from "./components/Layout";
import Login from "./components/NicknameScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap&subset=latin-ext"');
    font-family: 'Notable', sans-serif;
  }
`;

class App extends Component {
  state = {
    isNickname: false,
    nickname: "",
    isLoggedIn: true
  };

  handleUpdateNickname = props => {
    console.log(props);
    this.setState(
      {
        isNickname: true,
        nickname: props,
        isLoggedIn: true
      },
      () => {
        const { isNickname, nickname, isLoggedIn } = this.state;
        localStorage.setItem("isNickname", isNickname);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("isLoggedIn", isLoggedIn);
      }
    );
  };

  render() {
    return (
      <div>
        <GlobalStyles />
        {this.state.isLoggedIn ? (
          <Chat nickname={this.state.nickname} />
        ) : (
          <Login handleUpdateNickname={this.handleUpdateNickname} />
        )}
      </div>
    );
  }
}

export default App;
