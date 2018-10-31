import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const keyUpHandler = (evt) => {
      const currName = this.props.currUser.name;
      const newName = evt.target.previousSibling.value;
      if (evt.which === 13) {
        if (newName !== currName) {
          this.props.addMessage(null, `${currName ? currName : "Anonymous"} changed their name to ${newName ? newName : "Anonymous"}`, "incomingNotification")
          this.props.updateCurrUser(newName);
        }
        this.props.addMessage(newName ? newName : "Anonymous", evt.target.value, "incomingMessage");
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
