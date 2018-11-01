import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="dropdown">
        <span className="navbar-users">{this.props.numUsers} user{this.props.numUsers !== 1 ? "s" : ""} online</span>
        <UserList users={this.props.users} />
        </div>
      </nav>
    );
  }
}

class UserList extends Component {
  render() {
    const userElements = this.props.users.map((user) =>
      <User user={user} />
    );

    return (
      <div className="userList">
        {userElements}
      </div>
    );
  }
}

class User extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="user" style={{color: user.colour}}>
        {user.username ? user.username : "Anonymous"}
      </div>
    );
  }
}

export default Navbar;