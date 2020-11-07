import React from "react";
import { connect } from "react-redux";
import { deleteItem } from "../store/cartReducer";
import { CartItem } from "./CartItem";
import Checkout from "./Checkout";

class Cart extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <div>
        {cart.items ? (
          cart.items.length > 0 ? (
            <div>
              <div className="cart-container">
                {/* <div className='cart'> */}
                {cart.items.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      cart={cart}
                      removeItemFromCart={this.props.removeItemFromCart}
                      key={`cartItem-${item.id}`}
                    />
                  );
                })}
              </div>
              <div className="cart-totals">
                <p>
                  Total items ordered:{" "}
                  {cart.items.reduce(
                    (acc, item) => acc + item.orderItem.quantity,
                    0
                  )}
                </p>
                <p>
                  Total price: $
                  {cart.items.reduce((acc, item) => {
                    const groupPrice =
                      item.orderItem.quantity *
                      1 *
                      (item.orderItem.priceOrdered * 1);
                    return acc + groupPrice;
                  }, 0)}
                </p>
              </div>
              <div className="checkout-button">
                <Checkout />
              </div>
            </div>
          ) : (
            <div>You Currently have no items in your cart!</div>
          )
        ) : (
          <div>Loading Cart!</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItemFromCart: (userId, cartId, itemId) =>
      dispatch(deleteItem(userId, cartId, itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
