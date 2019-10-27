import React, { Component } from "react";
import "./App.css";
import Chat from "./components/Layout";
import Login from "./components/NicknameScreen";
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
    isLoggedIn: false
  };

  componentDidMount = () => {
    console.log(process.env.REACT_APP_SERVER);
    if (
      !localStorage.getItem("remembered") &&
      !localStorage.getItem("isLoggedIn")
    ) {
      localStorage.setItem("remembered", false);
      localStorage.setItem("isLoggedIn", false);
    }
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
        localStorage.setItem("isLoggedIn", isLoggedIn);
        if (localStorage.getItem("remembered") == "true") {
          localStorage.setItem("isNickname", isNickname);
          localStorage.setItem("nickname", nickname);
        }
      }
    );
  };

  render() {
    // let component;
    // if (localStorage.getItem("remembered") == "true") {
    //   component = <Chat nickname={localStorage.getItem("nickname")} />;
    // } else if (localStorage.getItem("remembered") == "false" && localStorage.getItem("isLoggedIn") == ) {
    //   component = <Login handleUpdateNickname={this.handleUpdateNickname} />;
    // } else if (
    //   localStorage.getItem("remembered") == "null" &&
    //   localStorage.getItem("isLoggedIn") == "true"
    // ) {
    //   console.log("inside");
    //   component = <Chat nickname={this.state.nickname} />;
    // }
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
