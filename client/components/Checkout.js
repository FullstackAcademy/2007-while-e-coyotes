import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { makeNewOrder } from "../store/cartReducer";
import { fetchUser } from "../store/userReducer";

class Checkout extends React.Component {
  constructor() {
    super();
    this.makeToken = this.makeToken.bind(this);
    this.state = {
      checkedOut: false,
    };
  }

  async componentWillUnmount() {
    if (this.state.checkedOut) {
      window.alert(`Item's successfully purchased!`);
      await this.props.getUser();
    }
  }

  makeToken(token) {
    this.props.getToken({
      user: this.props.user,
      cart: this.props.cart,
      token,
    });
  }

  render() {
    const { cart } = this.props;
    const totalPrice =
      cart.items.reduce((acc, item) => {
        acc += item.orderItem.priceOrdered * 1 * item.orderItem.quantity;
        return acc;
      }, 0) * 100;
    return (
      <div onClick={() => this.setState({ checkedOut: true })}>
        <StripeCheckout
          stripeKey="pk_test_51HjDcQCAamTGRiuGoNZcIjouKp2AliyNklI8tXtGwL60KfsXhE8pcA5FwdOS6tJLsQfrSbOZKwBlBZ9qUaIvXAWl00HNlbB38A"
          token={this.makeToken}
          amount={totalPrice}
        />
        {/* get user as well */}
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
    getToken: (user, cart) => dispatch(makeNewOrder(user, cart)),
    getUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
