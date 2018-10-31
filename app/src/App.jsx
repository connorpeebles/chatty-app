import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {name: ""},
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => console.log("Connected to server");
    this.socket.onmessage = this.handleMessage;
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <Chatbar currUser={this.state.currUser} addMessage={this.addMessage} updateCurrUser={this.updateCurrUser} />
      </div>
    );
  }

  addMessage = (username, content, type) => {
    const newMessage = {
      type: type,
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  handleMessage = (event) => {
    const newMessage = JSON.parse(event.data);

    if (newMessage.type === "incomingMessage") {
      console.log(`Incoming message from ${newMessage.username}`)
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    } else if (newMessage.type === "incomingNotification") {
      console.log("Incoming notification")
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    } else {
      console.log("Unknown response");
    }
  }

  updateCurrUser = (newName) => {
    this.setState({currUser: {name: newName}});
  }

}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

export default App;
