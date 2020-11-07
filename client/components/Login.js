import React from "react";
import { Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { mergeCartOnLogin } from "../store/cartReducer";

class Login extends React.Component {
  componentWillUnmount(history) {
    this.props.mergeAndGetCart(this.props.user, this.props.cart, history);
  }

  render() {
    return (
      <div id="loginPage">
        <div className="form-container">
          <h2>Login</h2>
          <Form>
            <Field type="text" name="username" placeholder="username" />
            <ErrorMessage name="username" />
            <Field type="password" name="password" placeholder="password" />
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
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mergeAndGetCart: (user, cart) => dispatch(mergeCartOnLogin(user, cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
