import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/userReducer";

class Admin extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.validateUser();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    return isAdmin ? (
      <div className="adminBar">
        <h2>Admin functions</h2>
        <Link className="admin-link" to="/admin/items">
          Product Management
        </Link>
        <Link className="admin-link" to="/admin/orders">
          Order Management
        </Link>
        <Link className="admin-link" to="/admin/users">
          User Management
        </Link>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapState, mapDispatch)(Admin);
