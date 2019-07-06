import React from "react";

class NicknameScreen extends React.Component {
  state = {
    nickname: "",
    submit: false
  };

  handleSubmitNickname = () => {
    this.setState({
      submit: true
    });
  };

  handleUpdateNickname = e => {
    console.log(e.target.value);
    this.setState({
      nickname: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form action="">
          <p>Write down your nickname</p>
          <input
            onChange={e => {
              this.handleUpdateNickname(e);
            }}
            type="text"
          />
          <button
            onClick={() => this.props.handleUpdateNickname(this.state.nickname)}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NicknameScreen;
