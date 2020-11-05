import React from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";
import { createUser } from "../store/usersReducer";

export class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
        address: "",
        class: "adventurer",
        userImage:
          "https://www.uwgc.org/images/default-source/100heroes/hero-icon-three2x.jpg?sfvrsn=6",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createUser(this.state.user, this.props.history);
  }

  render() {
    return (
      <UserForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        user={this.state.user}
      />
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createUser: (user, history) => dispatch(createUser(user, history)),
  };
};

export default connect(null, mapDispatch)(AddUser);
