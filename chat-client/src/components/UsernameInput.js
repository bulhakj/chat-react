import React from "react";

const UsernameInput = props => {
  return (
    <input
      type="text"
      placeholder="Username"
      value={props.username}
      onChange={event => props.updateUsername(event.target.value)}
      disabled={true}
    />
  );
};

export default UsernameInput;
