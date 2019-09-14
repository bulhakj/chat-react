import React from "react";

const RoomsBar = props => {
  return (
    <div>
      {props.chatRooms.map(item => {
        return (
          <div
            name={item}
            onClick={() => props.handleUpdateActiveChatroom(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default RoomsBar;
