import React from 'react';

// Chatbar that appears at the bottom of the page
function Chatbar(props) {
  // when user presses enter in chatbar-username input, a notification message is sent and username is updated
  const keyUpHandlerName = (evt) => {
    const currName = props.currUser.name;
    const newName = evt.target.value;
    if (evt.which === 13 && newName !== currName) {
      props.addMessage(null, `${currName ? currName : "Anonymous"} changed their name to ${newName ? newName : "Anonymous"}`, "postNotification")
      props.updateCurrUser(newName);
    }
  }

  // when user presses enter in chatbar-message input, the message is sent
  // if the username has also been changed, a notification message is sent and username is updated
  const keyUpHandlerMessage = (evt) => {
    const currName = props.currUser.name;
    const newName = evt.target.previousSibling.value;
    if (evt.which === 13 && evt.target.value) {
      if (newName !== currName) {
        props.addMessage(null, `${currName ? currName : "Anonymous"} changed their name to ${newName ? newName : "Anonymous"}`, "postNotification")
        props.updateCurrUser(newName);
      }
      props.addMessage(newName ? newName : "Anonymous", evt.target.value, "postMessage");
      evt.target.value = null;
    }
  }

  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        defaultValue={props.currUser.name}
        onKeyUp={keyUpHandlerName}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyUp={keyUpHandlerMessage}
      />
    </footer>
  );
}

export default Chatbar;
