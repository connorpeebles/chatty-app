import React from 'react';

// each individual message on the page
function Message(props) {
  const message = props.message;
  const words = message.content.split(' ');
  //counters used when assigning keys to the rendered images and weblinks
  let imgCounter = 0;
  let urlCounter = 0;

  // checks each 'word' in the message to see if its a weblink
  const output = words.map((word) => {
    // if word is an image link, render it is an image
    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(word)) {
      imgCounter++;
      return (<div key={'img' + imgCounter + ' ' + message.id} ><img src={word} /></div>);
    // if word is a weblink (starting with http/https), render it as a link
    } else if ((/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/).test(word)) {
      urlCounter++;
      return (<span key={'url' + urlCounter + ' ' + message.id} ><a target="_blank" rel="noopener noreferrer" href={word}>{word}</a> </span>)
    // if word is a weblink (NOT starting with http/https), render it as a link
    } else if ((/^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/).test(word)) {
      urlCounter++;
      return (<span key={'url' + urlCounter + ' ' + message.id} ><a target="_blank" rel="noopener noreferrer" href={'https://' + word}>{word}</a> </span>)
    } else {
      return word + ' ';
    }
  });

  const messageElement = () => {
    console.log(props.currUser)
    // render message
    if (message.type === 'incomingMessage' && message.clientId !== props.currUser.id) {
      return (
        <div className="message">
          <span style={{color: message.colour}} className="message-username">{message.username}</span>
          <span className="message-content">{output}</span>
          <span style={{color: message.colour}} className="message-username"></span>
        </div>
      );
    // render notification
    } else if (message.type === 'incomingMessage') {
      return (
        <div className="message">
          <span style={{color: message.colour}} className="message-username"></span>
          <span className="message-content curr-user">{output}</span>
          <span style={{color: message.colour}} className="message-username curr-user">{message.username}</span>
        </div>
      );
    } else if (message.type === 'incomingNotification') {
      return (
        <div className="message">
          <span style={{color: message.colour}} className="message-username"></span>
          <span className="message system"><ion-icon name="people"></ion-icon>&nbsp;{message.content}</span>
          <span style={{color: message.colour}} className="message-username curr-user"></span>
        </div>
      );
    }
  }

  return messageElement();
}

export default Message;
