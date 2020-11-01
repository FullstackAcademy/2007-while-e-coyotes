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
    console.log("props", this.props);
    const isAdmin = this.props.user && this.props.user.class === "admin";
    return isAdmin ? (
      <div className="adminBar">
        <Link className="admin" to="/items">
          Product Management
        </Link>
        <Link className="admin" to="/admin/orders">
          Order Management
        </Link>
        <Link className="admin" to="/admin/users">
          User Management
        </Link>
      </div>
    ) : (
      <div>Sorry, you are not an admin.</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
