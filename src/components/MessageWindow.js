import React from "react";

class MessageWindow extends React.Component {
  state = {};
  componentDidMount() {
    console.log("mounted");
  }
  render() {
    return <div>This is message window</div>;
  }
}

export default MessageWindow;
