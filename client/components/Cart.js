import React from "react";
import { connect } from "react-redux";
import { deleteItem } from "../store/cartReducer";
import { CartItem } from "./CartItem";
import Checkout from "./Checkout";

class Cart extends React.Component {
  render() {
    const { cart } = this.props;
    const subTotal = 0;
    return (
      <div>
        {cart.items ? (
          cart.items.length > 0 ? (
            <div>
              <div>
                {/* <div className='cart'> */}
                {cart.items.map((item) => {
                  const { orderItem } = item;
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
              <div>
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
