import React from "react";

export const CartItem = ({ item, cart, removeItemFromCart }) => {
  const { orderItem } = item;
  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.imageUrl} />
      </div>
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <div className="flex-row">
          <p>Price: ${orderItem.priceOrdered}</p>
          <p>Quantity: {orderItem.quantity}</p>
        </div>
        <button
          onClick={() => removeItemFromCart(cart.userId, cart.id, item.id)}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
};
