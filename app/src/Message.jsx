import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;
    const words = message.content.split(" ");
    const output = words.map((word) => {
      if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(word)) {
        return (<div><img src={word} /></div>);
      } else if ((/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(word)) {
        return (<span><a target="_blank" rel="noopener noreferrer" href={word}>{word}</a> </span>)
      } else if ((/^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(word)) {
        return (<span><a target="_blank" rel="noopener noreferrer" href={"https://" + word}>{word}</a> </span>)
      } else {
        return word + " ";
      }
    });

    const messageElement = () => {
      if (message.type === "incomingMessage") {
        return (
          <div className="message">
            <span style={{color: message.colour}} className="message-username">{message.username}</span>
            <span className="message-content">{output}</span>
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
