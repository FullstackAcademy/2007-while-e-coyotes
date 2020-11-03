import React from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";

export class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      address: "",
      class: "adventurer",
      userImage:
        "https://cdn.discordapp.com/attachments/320416924842590213/768044772648157194/unknown.png",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addRobot(this.state);
  }

  render() {
    return (
      <UserForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        robot={this.state}
      />
    );
  }
}

export default connect(null, null)(AddUser);
