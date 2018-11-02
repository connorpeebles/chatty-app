# Chatty

Chatty is a single-page instant messaging application built with ReactJS and websockets.

## Final Product

#### Screenshot of Chatty App
![screenshot](https://github.com/connorpeebles/chatty-app/blob/master/images/chatty_screenshot.png)

## Features

- Users may enter a username (or remain anonymous) and send messages, which are immediately displayed to all users currently in the chatroom
- Notification messages are sent to each user when a new user joins the chatroom, changes their username, or leaves the chatroom
- Header displays the number of online users; on hover, a dropdown appears which shows the usernames of each of the online users
- Users may send image URL's ending in gif, jpg, jpeg, tiff, or png, and the image is displayed in the messages
- Users may send a URL, which is displayed in the messages as a link which opens in a new tab when clicked
- Users are randomly assigned a colour upon entering the chat room

## Dependencies

- node: >=6.0.0
- babel-core: 6.23.1
- babel-loader: 6.3.1
- babel-preset-es2015: 6.22.0
- babel-preset-react: 6.23.0
- babel-preset-stage-0: 6.22.0
- css-loader: 0.26.1
- eslint: 3.15.0
- eslint-plugin-react: 6.9.0
- express: 4.16.4
- node-sass: 4.5.0
- react: 15.4.2
- react-dom: 15.4.2
- sass-loader: 6.0.0
- sockjs-client: ^1.1.2
- style-loader: 0.13.1
- uuid: ^3.3.2
- webpack: 2.2.1
- webpack-dev-server: 2.3.0
- ws: 6.1.0

## Getting Started

1. Clone this repository.
2. Open in the 'app' directory using `cd app` and install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:3000/>.
4. Open the 'chatty_server' directory using `cd ../chatty_server` and install dependencies using the `npm install` command.
5. Start the websocket server using the `npm start` command.
6. Go to <http://localhost:3000/> in your browser.