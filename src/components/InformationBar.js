import React from "react";

class InformationBar extends React.Component {
  state = {
    informationContent: ""
  };

  render() {
    return <div>{this.props.connectionInformation}</div>;
  }
}

export default InformationBar;
