import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: null,
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
        <Navbar numUsers={this.state.numUsers} />
        <MessageList messages={this.state.messages} />
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

    if (newMessage.type === "updateNumUsers") {
      console.log("Updated number of users");
      this.setState({numUsers: newMessage.numUsers})
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

  // searchForImage = (str) => {
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
  // }

  updateCurrUser = (newName) => {
    this.setState({currUser: {name: newName, colour: this.state.currUser.colour}});
  }

}

export default App;
