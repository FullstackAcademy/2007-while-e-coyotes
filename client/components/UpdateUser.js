import React from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";
import { updateUserAsUser } from "../store/usersReducer";

export class UpdateUser extends React.Component {
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

  // componentDidMount() {
  //   this.setState({user : this.props.user})
  // }

  handleChange(event) {
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserAsUser(this.state.user, this.props.history);
  }

  render() {
    return (
      <UserForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        user={this.state.user}
        buttonFunction={"Update"}
      />
    );
  }
}

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    updateUserAsUser: (user, history) =>
      dispatch(updateUserAsUser(user, history)),
  };
};

export default connect(mapState, mapDispatch)(UpdateUser);
