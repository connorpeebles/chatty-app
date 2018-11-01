import React from 'react';
import UserList from './UserList.jsx';

// navbar at the top of the app
function Navbar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty <ion-icon name="chatboxes"></ion-icon></a>
      <div className="users-dropdown">
        <span className="navbar-users">{props.users.length} user{props.users.length !== 1 ? "s" : ""} online</span>
        <UserList users={props.users} />
      </div>
    </nav>
  );
}

export default Navbar;