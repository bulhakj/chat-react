import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import NicknameScreen from "./components/NicknameScreen";

class App extends Component {
  state = {
    isNickname: false,
    nickname: ""
  };

  handleUpdateNickname = props => {
    this.setState(
      {
        isNickname: true,
        nickname: props
      },
      () => {
        const { isNickname, nickname } = this.state;
        localStorage.setItem("isNickname", isNickname);
        localStorage.setItem("nickname", nickname);
      }
    );
  };

  render() {
    return (
      <div>
        {this.state.isNickname ? (
          <div>
            <Layout nickname={this.state.nickname} title="This is the Layout" />
          </div>
        ) : (
          <NicknameScreen handleUpdateNickname={this.handleUpdateNickname} />
        )}
      </div>
    );
  }
}

export default App;
