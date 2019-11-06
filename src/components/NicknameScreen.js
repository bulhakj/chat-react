import React from "react";
import styled from "styled-components";
import LogoImage from "../static/images/logo.svg";
import LadyImage from "../static/images/ladysvg.svg";

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
  @media screen and (max-width: 576px) {
    font-size: 1rem;
    margin-top: 3vw;
  }
`;

const Logo = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 0.694vw;
  @media screen and (max-width: 576px) {
    height: 21px;
    width: 21px;
  }
`;

const LoginScreen = styled.div`
  width: 60.792vw;
  height: 30.694vw;
  background-color: #cfd8dc;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    width: 89vw;
    flex-wrap: wrap;
    height: 60vh;
    overflow: hidden;
    border-radius: 8px;
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  padding-left: 11vw;

  @media screen and (max-width: 576px) {
    width: 100%;
    padding: 0;
    height: auto;
  }
`;

const RightWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 576px) {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const LoginImage = styled.img`
  width: 24.306vw;
  padding-right: 0.1rem;

  @media screen and (max-width: 576px) {
    width: 68.306vw;
    margin-top: 6vw;
  }
`;

const LoginWrapper = styled.div`
  @media screen and (max-width: 576px) {
    padding: 0 7vw;
  }
`;

const WelcomeText = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 5vw;
  line-height: 7.778vw;
  letter-spacing: 0.03em;
  color: #23272a;
  margin-top: 2.5vw;
  margin-bottom: 1.5vw;
  @media screen and (max-width: 576px) {
    text-align: center;
    font-size: 2.2rem;
    padding-top: 8vw;
  }
`;

const NicknameParagraph = styled.p`
  color: #565656;
  font-size: 1.3vw;
  margin-bottom: 0.7vw;
  @media screen and (max-width: 576px) {
    font-size: 0.7rem;
    margin-top: 12vw;
  }
`;

const NicknameInput = styled.input`
  width: 100%;
  height: 2.125vw;
  border-radius: 4px;
  outline: none;
  border: none;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  font-size: 1vw;
  box-sizing: border-box;
  @media screen and (max-width: 576px) {
    height: 7.125vw;
    font-size: 0.7rem;
  }
`;

const LoginButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 2vw;
  @media screen and (max-width: 768px) {
    display: none;
  }
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

const LoginButtonMobile = styled.button`
  display: none;
  width: 100%;
  background-color: #03a9f4;
  border-radius: 4px;
  border: none;
  color: #fff;
  height: 36px;
  width: 98px;
  font-size: 17px;

  @media screen and (max-width: 768px) {
    display: block;
    width: 89vw;
    margin-top: 5vw;
    margin-bottom: 5vw;
  }
`;

class NicknameScreen extends React.Component {
  state = {
    nickname: "",
    submit: false,
    isChecked: false,
    isRemembered: false
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
            <LoginScreen id="login-screen">
              <LeftWrapper id="left-wrapper">
                <LoginWrapper id="login-wrapper">
                  <WelcomeText id="welcome-text">Hi there !</WelcomeText>
                  <NicknameParagraph id="nickname-paragraph">
                    Nickname
                  </NicknameParagraph>
                  <NicknameInput
                    id="nickname-input"
                    onChange={e => {
                      this.handleChangeNickname(e);
                    }}
                    type="text"
                  />
                  <LoginButtonWrapper id="login-button-wrapper">
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
            <LoginButtonMobile
              id="login-btn-mobile"
              onClick={() =>
                this.props.handleUpdateNickname(this.state.nickname)
              }
              type="submit"
            >
              JOIN
            </LoginButtonMobile>
          </Application>
        </form>
      </div>
    );
  }
}

export default NicknameScreen;
