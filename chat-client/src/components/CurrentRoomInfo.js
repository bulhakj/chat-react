import React from "react";

const handleChangeChatRoom = () => {};

const CurrentRoomInfo = props => {
  return <p onClick={handleChangeChatRoom}>current room {props.currentRoom}</p>;
};

export default CurrentRoomInfo;
