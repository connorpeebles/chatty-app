import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

// main app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currUser: {name: ""},
      messages: []
    }
  }

  // adds websocket for new user and redirects message received from server to helper function 'handleMessage'
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("Connected to server");
      this.updateCurrUser(this.state.currUser.name);
    }
    this.socket.onmessage = this.handleMessage;
  }

  // calls scrollToBottom when a component updates
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div>
        <Navbar users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
        <Chatbar currUser={this.state.currUser} addMessage={this.addMessage} updateCurrUser={this.updateCurrUser} />
      </div>
    );
  }

  // sends message to server
  addMessage = (username, content, type) => {
    const newMessage = {
      type: type,
      username: username,
      content: content,
      colour: this.state.currUser.colour
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  // handles message received from server
  handleMessage = (event) => {
    const newMessage = JSON.parse(event.data);

    // updates users state
    if (newMessage.type === "updateUsers") {
      this.setState({users: newMessage.users});
    // updates colour parameter of currUser state
    } else if (newMessage.type === "assignColour") {
      this.setState({currUser: {name: this.state.currUser.name, colour: newMessage.colour}});
    // updates messages state
    } else if (newMessage.type === "incomingMessage") {
      console.log(`Incoming message from ${newMessage.username}`)
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    // updates messages state
    } else if (newMessage.type === "incomingNotification") {
      console.log("Incoming notification")
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    } else {
      console.log("Unknown response from server");
    }
  }

  // ensures the app auto scrolls so that the most recent message is visible
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  // sends message of updated username to the server and updates the name parameter of the currUser state
  updateCurrUser = (newName) => {
    this.setState({currUser: {name: newName, colour: this.state.currUser.colour}});
    const currUserName = {
      type: "setCurrUserName",
      username: newName
    };
    this.socket.send(JSON.stringify(currUserName));
  }

}

export default App;
