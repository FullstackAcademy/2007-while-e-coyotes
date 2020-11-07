import { withFormik } from "formik";
import Login from "./Login";
import { connect } from "react-redux";
import { validateLogin } from "../store/userReducer";
import { fetchCart } from "../store/cartReducer";

const FormikLogin = withFormik({
  mapPropsToValues: (props) => {
    return {
      username: "",
      password: "",
      loginUser: props.loginUser,
      history: props.history,
      getCart: props.getCart,
    };
  },
  handleSubmit: async (values) => {
    try {
      const loginInfo = {
        username: values.username,
        password: values.password,
      };
      await values.loginUser(loginInfo, values.history);
    } catch (err) {
      console.log(`Failed login attempt!`);
    }
  },
})(Login);

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (loginInfo, history) =>
      dispatch(validateLogin(loginInfo, history)),
    getCart: (user) => dispatch(fetchCart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormikLogin);
