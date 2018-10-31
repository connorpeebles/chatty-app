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
    console.log("Connected to server");
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
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
