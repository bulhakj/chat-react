import React from "react";
import styled from "styled-components";
import LogoImage from "../static/images/logo.svg";
import LadyImage from "../static/images/ladysvg.svg";
import Chat from "./Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

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
  display: flex;
  align-items: center;
`;

const LoginImage = styled.img`
  width: 24.306vw;
  padding-right: 0.1rem;
`;

const LoginWrapper = styled.div``;

const WelcomeText = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 5vw;
  line-height: 7.778vw;
  letter-spacing: 0.03em;
  color: #23272a;
  margin-top: 2.5vw;
  margin-bottom: 1.5vw;
`;

const NicknameParagraph = styled.p`
  color: #565656;
  font-size: 1.3vw;
  margin-bottom: 0.7vw;
`;

const NicknameInput = styled.input`
  width: 100%;
  height: 2.125vw;
  border-radius: 4px;
  outline: none;
  border: none;
  padding-left: 0.5vw;
  font-size: 1vw;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  margin-top: 0.7vw;
  margin-bottom: 1.5vw;
`;

const RememberMeCheckboxLabel = styled.label`
  width: 100%;
  color: #565656;
  display: flex;
  align-items: center;
  font-size: 1vw;
`;

const RememberMeCheckbox = styled.input`
  margin-left: 0px;
`;

const LoginButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled.button`
  background-color: #03a9f4;
  border-radius: 4px;
  border: none;
  color: #fff;
  height: 36px;
  width: 98px;
  font-size: 17px;
`;

class NicknameScreen extends React.Component {
  state = {
    nickname: "",
    submit: false,
    isChecked: false,
    isRemembered: false
  };

  componentDidMount = () => {
    console.log(localStorage.getItem("nickname"));
  };

  handleSubmitNickname = () => {
    this.setState({
      submit: true
    });
  };

  handleChangeNickname = e => {
    this.setState({
      nickname: e.target.value
    });
  };

  handleUpdateCheckboxStatus = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
        isRemembered: !this.state.isRemembered
      },
      () => {
        localStorage.setItem("remembered", this.state.isRemembered);
      }
    );
  };

  render() {
    return (
      <div>
        <form action="">
          <Application id="application-wrapper">
            <LogoContainer id="logo-container">
              <LogoWrapper id="logo-wrapper">
                <CirrusWrapper id="cirrus-wrapper">
                  <Logo id="logo-image" src={LogoImage} alt="" />
                  cirrus
                </CirrusWrapper>
              </LogoWrapper>
            </LogoContainer>
            <LoginScreen>
              <LeftWrapper>
                <LoginWrapper>
                  <WelcomeText>Hi there !</WelcomeText>
                  <NicknameParagraph>Nickname</NicknameParagraph>
                  <NicknameInput
                    id="nickname-input"
                    onChange={e => {
                      this.handleChangeNickname(e);
                    }}
                    type="text"
                  />
                  <CheckboxWrapper>
                    <RememberMeCheckboxLabel>
                      <RememberMeCheckbox
                        onClick={() => this.handleUpdateCheckboxStatus()}
                        type="checkbox"
                      />
                      Remember me
                    </RememberMeCheckboxLabel>
                  </CheckboxWrapper>
                  <LoginButtonWrapper>
                    <LoginButton
                      id="login-btn"
                      onClick={() =>
                        this.props.handleUpdateNickname(this.state.nickname)
                      }
                      type="submit"
                    >
                      JOIN
                    </LoginButton>
                  </LoginButtonWrapper>
                </LoginWrapper>
              </LeftWrapper>
              <RightWrapper id="right-wrapper">
                <LoginImage id="lady-image" src={LadyImage} />
              </RightWrapper>
            </LoginScreen>
          </Application>
        </form>
      </div>
    );
  }
}

export default NicknameScreen;
