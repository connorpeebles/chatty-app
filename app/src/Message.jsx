import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;

    const words = message.content.split(" ");
    const output = words.map((word) => {
      if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(word)) {
        return (<img src={word} />);
      } else {
        return word + " ";
      }
    });

    // const searchForImage = (str) => {
    //   const words = str.split(" ");
    //   let output = "";
    //   for (const word of words) {
    //     if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(word)) {
    //       output = output + `<img src='${word}' >` + " ";
    //     } else {
    //       output = output + word + " ";
    //     }
    //   }
    //   return output;
    // };

    //     const messageElements = this.props.messages.map((message) =>
    //   <Message message={message} key={message.id} />
    // );

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
