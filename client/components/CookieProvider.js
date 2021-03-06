import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/userReducer";
import { fetchCart } from "../store/cartReducer";

class CookieProvider extends React.Component {
  async componentDidMount() {
    await this.props.getUser();
    await this.props.getCart(this.props.user);
  }

  componentDidUpdate() {
    this.props.getCart(this.props.user);
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(fetchUser()),
    getCart: (user) => dispatch(fetchCart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CookieProvider);
