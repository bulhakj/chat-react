import React, { Component } from "react";

class Layout extends Component {
  render() {
    const { title } = this.props;
    return <div className="container">{title}</div>;
  }
}

export default Layout;
