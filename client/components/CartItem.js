import React from "react";

export const CartItem = ({ item, cart, removeItemFromCart }) => {
  const { orderItem } = item;
  return (
    <div className="cart-item" key={item.id}>
      {/* can add this back when we style crap, rn its hard to look at the page <ItemCard item={item} key={`item_${item.id}`}/> */}
      {item.name}
      <br />
      Quantity: {orderItem.quantity} <br />
      <button onClick={() => removeItemFromCart(cart.userId, cart.id, item.id)}>
        Remove From Cart
      </button>
    </div>
  );
};
