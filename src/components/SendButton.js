import React from "react";
import styled from "styled-components";

const SendButtonWrapper = styled.div`
  height: 24px;
  width: 24px;
`;

const SendButtonSvg = styled.svg`
  fill: #03a9f4;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: #14b9f5;
  }
`;

const sendButton = props => {
  return (
    <SendButtonWrapper onClick={() => props.handleSendMouseBtnMessage(true)}>
      <SendButtonSvg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="send_24px">
          <path
            id="icon/content/send_24px"
            clipRule="evenodd"
            d="M1.5 10L1.51 3L22.5 12L1.51 21L1.5 14L16.5 12L1.5 10ZM3.51 6.03L11.02 9.25L3.5 8.25L3.51 6.03ZM11.01 14.75L3.5 17.97V15.75L11.01 14.75Z"
          />
        </g>
      </SendButtonSvg>
    </SendButtonWrapper>
  );
};

export default sendButton;
