import React from "react";

const UsernameInput = props => {
  return (
    <input
      type="text"
      placeholder="Username"
      value={props.value}
      onChange={event => props.updateUsername(event.target.value)}
    />
  );
};

export default UsernameInput;
