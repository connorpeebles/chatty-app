import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 8,
      currUser: {name: "Bob"},
      messages: [
        {
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1",
          id: 1
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
          id: 2
        },
        {
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2",
          id: 3
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom",
          id: 4
        },
        {
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2",
          id: 5
        },
        {
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom",
          id: 6
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
          id: 7
        },
      ]
    }
    this._addMessage = this._addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 8, type: "incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <Chatbar currUser={this.state.currUser} addMessage={this._addMessage} />
      </div>
    );
  }

  _addMessage(username, content) {
    const newCounter = this.state.counter + 1;
    const newMessage = {
      id: newCounter,
      type: "incomingMessage",
      username: username,
      content: content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({counter: newCounter, messages: messages});
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
