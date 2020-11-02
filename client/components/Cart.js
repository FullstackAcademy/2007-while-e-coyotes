import React from "react";
import { connect } from "react-redux";
import { deleteItem } from "../store/cartReducer";

class Cart extends React.Component {
  render() {
    const { cart } = this.props;
    const subTotal = 0;
    return (
      <div>
        {cart.items ? (
          <div>
            {cart.items.map((item) => {
              const { orderItem } = item;
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} />
                  Name: {item.name}
                  Price: {orderItem.priceOrdered}
                  Quantity: {orderItem.quantity}
                  <button
                    onClick={() =>
                      this.props.removeItemFromCart(
                        cart.userId,
                        cart.id,
                        item.id
                      )
                    }
                  >
                    Remove From Cart
                  </button>
                </div>
              );
            })}
            <div>
              <button
                onClick={() =>
                  console.log("need to add a checkout component :^)")
                }
              >
                Checkout!
              </button>
            </div>
          </div>
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
