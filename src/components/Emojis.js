import React from "react";
import styled from "styled-components";
import { Component } from "react";

const SvgPath = styled.path`
  transition: all 0.2s ease-in-out;
`;
const EmojisSvg = styled.svg`
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    cursor: pointer;
    fill: #03a9f4;
  }
`;

class Emojis extends Component {
  state = {
    isOpen: false
  };

  openEmojis = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen
      },
      () => {
        this.props.handleOpenEmojiPicker(this.state.isOpen);
      }
    );
  };
  render() {
    return (
      <div onClick={this.openEmojis}>
        <EmojisSvg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="mood_24px">
            <SvgPath
              id="icon/social/mood_24px"
              clipRule="evenodd"
              d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.57999 20 3.99999 16.42 3.99999 12C3.99999 7.58 7.57999 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM17 9.5C17 10.33 16.33 11 15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5ZM8.49999 11C9.32999 11 9.99999 10.33 9.99999 9.5C9.99999 8.67 9.32999 8 8.49999 8C7.66999 8 6.99999 8.67 6.99999 9.5C6.99999 10.33 7.66999 11 8.49999 11ZM17.11 14C16.31 16.04 14.33 17.5 12 17.5C9.67001 17.5 7.69001 16.04 6.89001 14H17.11Z"
              fill="#767676"
            />
          </g>
        </EmojisSvg>
      </div>
    );
  }
}

export default Emojis;
