import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;

    const messageElement = () => {
      if (message.type === "incomingMessage") {
        return (
          <div className="message">
            <span style={{color: message.colour}} className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        );
      } else if (message.type === "incomingNotification") {
        return (
          <div className="message system">{message.content}</div>
        );
      }
    }

    return messageElement();
  }
}

export default Message;
