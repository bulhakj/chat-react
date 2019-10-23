import React from "react";
import styled from "styled-components";

const CurrentRoomParagraph = styled.p`
  margin: 0;
  padding-left: 1vw;
`;

const CurrentRoomInfo = props => {
  return <CurrentRoomParagraph>{props.currentRoom}</CurrentRoomParagraph>;
};

export default CurrentRoomInfo;
