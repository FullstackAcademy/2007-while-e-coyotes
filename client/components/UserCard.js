import React from "react";
import { Link } from "react-router-dom";

export const UserCard = ({ user }) => {
  return (
    <div className="userCard">
      <div className="userImg">
        <img src={user.userImage} />
      </div>
      <div className="userInfo">
        <h3>Username: {user.username}</h3>
        <p>Class: {user.class}</p>
        <p>
          {" "}
          Email:
          {user.email ? user.email : "No email associated with this account"}
        </p>
      </div>
    </div>
  );
};
