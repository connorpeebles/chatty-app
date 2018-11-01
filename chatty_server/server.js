// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colours = ["tomato", "red", "green", "blue", "purple", "#2F4F4F"];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  // client.thisisatest = "lol";
  // console.log(client);

  // const updateNumUsers = () => {
  //   const numUsers = {
  //     type: "updateNumUsers",
  //     numUsers: wss.clients.size
  //   };
  //   wss.clients.forEach((c) => {
  //     c.send(JSON.stringify(numUsers));
  //   });
  // };
  // updateNumUsers();

  const updateUsers = () => {
    let userArr = [];
    wss.clients.forEach((c) => {
      userArr.push({username: c.username, colour: c.colour});
    });
    const users = {
      type: "updateUsers",
      users: userArr
    };
    wss.clients.forEach((c) => {
      c.send(JSON.stringify(users));
    });
  };

  const assignColour = () => {
    const random = Math.floor(Math.random() * 6);
    const colour = colours[random];
    client.colour = colour;
    const userColour = {
      type: "assignColour",
      colour: colour
    };
    client.send(JSON.stringify(userColour));
  };
  assignColour();

  client.on('message', (message) => {
    // console.log(wss.clients);
    const sendMessage = () => {
      wss.clients.forEach((c) => {
        c.send(JSON.stringify(messageObj));
      });
    };

    const messageObj = JSON.parse(message);

    if (messageObj.type === "setCurrUserName") {
      client.username = messageObj.username;
      // console.log(wss.clients);
      updateUsers();
    } else if (messageObj.type === "postMessage") {
      console.log(`User ${messageObj.username} said ${messageObj.content}`);
      messageObj.id = uuidv4();
      messageObj.type = "incomingMessage";
      // messageObj.content = searchForImage(messageObj.content);
      // console.log(messageObj.content);
      sendMessage();
    } else if (messageObj.type === "postNotification") {
      console.log("Updated user");
      messageObj.id = uuidv4();
      messageObj.type = "incomingNotification";
      sendMessage();
    } else {
      console.log("Unknown request");
    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    // updateNumUsers();
    updateUsers();
    console.log('Client disconnected')
  });
});