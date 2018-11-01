import React from 'react';

// each user rendered in the UserList
function User(props) {
  const user = props.user;

  return (
    <div className="user" style={{color: user.colour}}>
      {user.username ? user.username : 'Anonymous'}
    </div>
  );
}

export default User;