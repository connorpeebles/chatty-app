import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {name: "Bob"},
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server");
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
      // console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      // const newMessage = {id: 8, type: "incomingMessage", username: "Michelle", content: "Hello there!"};
      // const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      // this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <Chatbar currUser={this.state.currUser} addMessage={this.addMessage} />
      </div>
    );
  }

  addMessage = (username, content) => {
    const newId = this.generateRandomString();
    const newMessage = {
      id: newId,
      type: "incomingMessage",
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
  }

  generateRandomString = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let output = "";

    for (let i = 0; i < 6; i++) {
      let randNum = Math.floor(Math.random() * 36);
      let char = chars.substring(randNum, randNum + 1);
      output += char;
    }

    return output;
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
