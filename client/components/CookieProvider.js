import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/userReducer";
import { fetchCart } from "../store/cartReducer";

class CookieProvider extends React.Component {
  async componentDidMount() {
    await this.props.getUser();
    if (this.props.user.class !== "guest") {
      this.props.getCart(this.props.user);
    }
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
