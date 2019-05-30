import React from "react";

const MessageInput = props => {
  console.log(props);

  const handleEnterSend = e => {
    if (e.key === "Enter") {
      props.sendMessage(e);
    }
  };

  const handleInputChanges = e => {};

  console.log(props);
  return (
    <input
      value={props.value}
      type="text"
      placeholder="Type your message here"
      onChange={event => {
        console.log(event.target.value);
        // props.inputChanges(event.target.value);
        props.handleUpdateInputChanges(event.target.value);
        props.onKeyDownNotEnter();
        // props.handleUpdateMessage(event.target.value);
        // props.handleUpdateInputChanges(event.target.value);
      }}
      onKeyUp={handleEnterSend}
    />
  );
};

export default MessageInput;
