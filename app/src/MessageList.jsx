import React from 'react';
import Message from './Message.jsx';

function MessageList(props) {
  // maps a Message component for each message
  const messageElements = props.messages.map((message) =>
    <Message message={message} key={message.id} />
  );

  return (
    <main className="messages">
      {messageElements}
    </main>
  );
}

export default MessageList;
