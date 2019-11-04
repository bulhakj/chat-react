import React from "react";
import styled from "styled-components";

const RoomsWrapper = styled.div`
  padding-left: 2.5rem;
  margin-bottom: 1.6vw;
  font-size: 0.9vw;
  transition: all .2s ease-in-out
  &:hover {
    color: #03a9f4;
    cursor: pointer;
  }
`;

const RoomsBar = props => {
  return (
    <div>
      {props.chatRooms.map(item => {
        return (
          <RoomsWrapper
            name={item}
            key={item}
            onClick={() => props.handleUpdateActiveChatroom(item)}
          >
            {item}
          </RoomsWrapper>
        );
      })}
    </div>
  );
};

export default RoomsBar;
