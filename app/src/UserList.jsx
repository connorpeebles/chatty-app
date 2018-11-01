import React from 'react';
import User from './User.jsx';

// the list of online users which appears when the user hovers over the number of users (top right of navbar)
function UserList(props) {
  // maps a User component for each user
  const userElements = props.users.map((user) =>
    <User user={user} />
  );

  return (
    <div className="userList">
      {userElements}
    </div>
  );
}

export default UserList;