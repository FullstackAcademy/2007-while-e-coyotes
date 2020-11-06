import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/userReducer";
import { getUsers, destroyUser } from "../store/usersReducer";

import { UserCard } from "./UserCard";

class AdminUser extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.validateUser();
    this.props.getUsers();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    const { users } = this.props;
    return isAdmin ? (
      <div className="admin admin__users">
        <h2>Users</h2>
        <div className="grid-container">
          {users
            ? users.map((user) => {
                return (
                  <div key={`userCard_${user.id}`}>
                    <UserCard user={user} key={`user_${user.id}`} />
                    <button
                      key={`deleteUser_${user.id}`}
                      onClick={() => this.props.destroyUser(user)}
                    >
                      {" "}
                      Delete User
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    validateUser: () => dispatch(fetchUser()),
    getUsers: () => dispatch(getUsers()),
    destroyUser: (id) => dispatch(destroyUser(id)),
  };
};

export default connect(mapState, mapDispatch)(AdminUser);
