// websocket server

const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");

const PORT = 3001;

const server = express()
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// possible username display colours
const colours = ["tomato", "red", "green", "blue", "purple", "#2F4F4F"];

// When a client connects they are assigned a socket, represented by the 'client' parameter in the callback.
wss.on("connection", (client) => {
  console.log("Client connected");

  // sendMessage converts the 'JSONmessage' to a string and sends it to the browser of each user
  const sendMessage = (JSONmessage) => {
    wss.clients.forEach((c) => {
      c.send(JSON.stringify(JSONmessage));
    });
  };

  const newUserAlert = () => {
    const alert = {
      type: "incomingNotification",
      content: "A new user has joined the chat"
    };
    sendMessage(alert);
  };
  newUserAlert();

  // assignColour assigns a random colour (from constant 'colours') to the connected user and sends it to the browser of that user
  const assignColour = () => {
    const random = Math.floor(Math.random() * colours.length);
    const colour = colours[random];
    client.colour = colour;
    const userColour = {
      type: "assignColour",
      colour: colour
    };
    client.send(JSON.stringify(userColour));
  };
  assignColour();

  // updateUsers sends the username and colour for each user to the browser of each user
  const updateUsers = () => {
    let userArr = [];
    wss.clients.forEach((c) => {
      userArr.push({username: c.username, colour: c.colour});
    });
    const users = {
      type: "updateUsers",
      users: userArr
    };
    sendMessage(users);
  };

  client.on("message", (message) => {
    // message received, as a JSON
    const messageObj = JSON.parse(message);

    if (messageObj.type === "setCurrUserName") {
      client.username = messageObj.username;
      updateUsers();
    } else if (messageObj.type === "postMessage") {
      console.log(`User ${messageObj.username} said ${messageObj.content}`);
      messageObj.id = uuidv4();
      messageObj.type = "incomingMessage";
      // messageObj.content = searchForImage(messageObj.content);
      // console.log(messageObj.content);
      sendMessage(messageObj);
    } else if (messageObj.type === "postNotification") {
      console.log("Updated user");
      messageObj.id = uuidv4();
      messageObj.type = "incomingNotification";
      sendMessage(messageObj);
    } else {
      console.log("Unknown request");
    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on("close", () => {
    const alert = {
      type: "incomingNotification",
      content: `${client.username} has left the chat`
    };
    sendMessage(alert);
    // updateNumUsers();
    updateUsers();
    console.log("Client disconnected")
  });
});