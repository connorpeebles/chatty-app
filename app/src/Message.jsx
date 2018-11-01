import React from 'react';

function Message(props) {
  const message = props.message;
  const words = message.content.split(' ');

  // checks each 'word' in the message to see if its a weblink
  const output = words.map((word) => {
    // if word is an image link, render it is an image
    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(word)) {
      return (<div><img src={word} /></div>);
    // if word is a weblink (starting with http/https), render it as a link
    } else if ((/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(word)) {
      return (<span><a target="_blank" rel="noopener noreferrer" href={word}>{word}</a> </span>)
    // if word is a weblink (NOT starting with http/https), render it as a link
    } else if ((/^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).test(word)) {
      return (<span><a target="_blank" rel="noopener noreferrer" href={'https://' + word}>{word}</a> </span>)
    } else {
      return word + ' ';
    }
  });

  const messageElement = () => {
    // render message
    if (message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span style={{color: message.colour}} className="message-username">{message.username}</span>
          <span className="message-content">{output}</span>
        </div>
      );
    // render notification
    } else if (message.type === 'incomingNotification') {
      return (
        <div className="message system">{message.content}</div>
      );
    }
  }

  return messageElement();
}

export default Message;
