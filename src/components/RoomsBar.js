import React from "react";
import styled from "styled-components";

const RoomsContainer = styled.div`
  @media screen and (max-width: 576px) {
    margin-top: 6vw;
  }
`;

const RoomsWrapper = styled.div`
  padding-left: 2.5rem;
  margin-bottom: 1.6vw;
  font-size: 0.9vw;
  transition: all .2s ease-in-out
  &:hover {
    color: #03a9f4;
    cursor: pointer;
  }
  @media screen and (max-width: 576px) {
    margin-bottom: 4.6vw;
    font-size: 0.8rem;
  }
`;

const RoomsBar = props => {
  return (
    <RoomsContainer id="rooms-container">
      {props.chatRooms.map(item => {
        return (
          <RoomsWrapper
            name={item}
            key={item}
            onClick={() => {
              props.handleUpdateActiveChatroom(item);
              props.handleUpdateIsRoomsOpen(false);
            }}
          >
            {item}
          </RoomsWrapper>
        );
      })}
    </RoomsContainer>
  );
};

export default RoomsBar;
