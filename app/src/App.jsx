import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // numUsers: null,
      users: [],
      currUser: {name: ""},
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("Connected to server");
      this.updateCurrUser(this.state.currUser.name);
    }
    this.socket.onmessage = this.handleMessage;
  }

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

  addMessage = (username, content, type) => {
    const newMessage = {
      type: type,
      username: username,
      content: content,
      colour: this.state.currUser.colour
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  handleMessage = (event) => {
    const newMessage = JSON.parse(event.data);

    // if (newMessage.type === "updateNumUsers") {
    //   console.log("Updated number of users");
    //   this.setState({numUsers: newMessage.numUsers})
    if (newMessage.type === "updateUsers") {
      console.log(newMessage.users);
      this.setState({users: newMessage.users});
    } else if (newMessage.type === "assignColour") {
      this.setState({currUser: {name: this.state.currUser.name, colour: newMessage.colour}});
    } else if (newMessage.type === "incomingMessage") {
      console.log(`Incoming message from ${newMessage.username}`)
      // newMessage.content = this.searchForImage(newMessage.content);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    } else if (newMessage.type === "incomingNotification") {
      console.log("Incoming notification")
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    } else {
      console.log("Unknown response from server");
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  updateCurrUser = (newName) => {
    this.setState({currUser: {name: newName, colour: this.state.currUser.colour}});
    const currUserName = {
      type: "setCurrUserName",
      username: newName
    };
    console.log(currUserName);
    this.socket.send(JSON.stringify(currUserName));
  }

}

export default App;
