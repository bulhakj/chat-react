import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import NicknameScreen from "./components/NicknameScreen";
import styled from "styled-components";
import LogoImage from "./static/images/logo.svg";
import LadyImage from "./static/images/ladysvg.svg";

const Application = styled.div`
  background-color: #23272a;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const LogoContainer = styled.div`
  padding-bottom: 3.25vw;
  width: 100%;
`;

const LogoWrapper = styled.div`
  margin-top: 2.411vw;
  display: flex;
`;

const CirrusWrapper = styled.span`
  color: #dadada;
  width: 100%;
  letter-spacing: 0.05em;
  font-family: Roboto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 7vw;
  font-size: 1.5rem;
`;

const Logo = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 0.694vw;
`;

const LoginScreen = styled.div`
  width: 60.792vw;
  height: 30.694vw;
  background-color: #cfd8dc;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  height: 100%;
  padding-left: 11vw;
`;

const RightWrapper = styled.div`
  height: 100%;
`;

const LoginImage = styled.img`
  width: 350px;
`;

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
      <Application>
        <LogoContainer>
          <LogoWrapper>
            <CirrusWrapper>
              <Logo src={LogoImage} alt="" />
              cirrus
            </CirrusWrapper>
          </LogoWrapper>
        </LogoContainer>
        <LoginScreen>
          <LeftWrapper>
            {this.state.isNickname ? (
              <div>
                <Layout
                  nickname={this.state.nickname}
                  title="This is the Layout"
                />
              </div>
            ) : (
              <NicknameScreen
                handleUpdateNickname={this.handleUpdateNickname}
              />
            )}
          </LeftWrapper>
          <RightWrapper>
            <LoginImage src={LadyImage} />
          </RightWrapper>
        </LoginScreen>
      </Application>
    );
  }
}

export default App;
