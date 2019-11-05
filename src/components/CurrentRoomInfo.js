import React from "react";
import styled from "styled-components";

const CurrentRoomParagraph = styled.p`
  margin: 0;
  padding-left: 1vw;
  @media screen and (max-width: 576px) {
    margin-top: 0.5vw;
  }
`;

const CurrentRoomInfo = props => {
  return (
    <CurrentRoomParagraph id="current-room-paragraph">
      {props.currentRoom}
    </CurrentRoomParagraph>
  );
};

export default CurrentRoomInfo;
