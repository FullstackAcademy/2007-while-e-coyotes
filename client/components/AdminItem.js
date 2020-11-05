import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/userReducer";

class AdminItem extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.validateUser();
  }
  render() {
    const isAdmin = this.props.user && this.props.user.class === "admin";
    return isAdmin ? (
      <div className="admin admin__item">
        <Link to="/admin/createItem">Create an Item</Link>
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

export default connect(mapState, mapDispatch)(AdminItem);
