import React, {Component} from 'react';

class Message extends Component {
  render() {
    const messageElement = () => {
      if (this.props.type === "incomingMessage") {
        return (
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
      } else if (this.props.type === "incomingNotification") {
        return (
          <div className="message system">{this.props.content}</div>
        );
      }
    }

    return (
      <div>
        {messageElement()}
      </div>
    );
  }
}

export default Message;
