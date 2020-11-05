import React from "react";
import { Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { fetchCart } from "../store/cartReducer";

class Login extends React.Component {
  componentWillUnmount() {
    this.props.getCart(this.props.user);
  }

  render() {
    return (
      <div id="loginPage">
        <div className="form-container">
          <h2>Login</h2>
          <Form>
            <Field type="text" name="username" placeholder="username" />
            <ErrorMessage name="username" />
            <Field type="text" name="password" placeholder="password" />
            <ErrorMessage name="password" />
            <button type="submit"> Submit </button>
          </Form>
        </div>
      </div>
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
    getCart: (user) => dispatch(fetchCart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
