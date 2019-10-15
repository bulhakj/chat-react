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
`;

const LoginImage = styled.img`
  width: 350px;
`;

class NicknameScreen extends React.Component {
  state = {
    nickname: "",
    submit: false
  };

  handleSubmitNickname = () => {
    this.setState({
      submit: true
    });
  };

  handleUpdateNickname = e => {
    console.log(e.target.value);
    this.setState({
      nickname: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form action="">
          <p>Write down your nickname</p>
          <input
            onChange={e => {
              this.handleUpdateNickname(e);
            }}
            type="text"
          />
          <Router>
            <Switch>
              <Link to="/chat">CHAT </Link>
            </Switch>
          </Router>
          <button onClick={e => this.handleUpdateNickname(e)} type="submit">
            Submit
          </button>

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
                {/* {this.state.isNickname ? (
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
              )} */}
              </LeftWrapper>
              <RightWrapper>
                <LoginImage src={LadyImage} />
              </RightWrapper>
            </LoginScreen>
          </Application>
        </form>
      </div>
    );
  }
}

export default withRouter(NicknameScreen);
