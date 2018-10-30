import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const keyUpHandler = (evt) => {
      if (evt.which === 13) {
        this.props.addMessage(this.props.currUser ? this.props.currUser.name : "Anonymous", evt.target.value);
        evt.target.value = null;
      }
    }

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currUser ? this.props.currUser.name : null}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={keyUpHandler}
        />
      </footer>
    );
  }
}

export default Chatbar;
