import axios from "axios";

const SET_CART = "SET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";

const _setCart = (cartData) => {
  return {
    type: SET_CART,
    cartData,
  };
};

const _removeItem = (cartData) => {
  return {
    type: REMOVE_ITEM,
    cartData,
  };
};

export const makeNewOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orders/makeOrder", order);
      dispatch(_setCart(data));
    } catch (err) {
      console.log("err in order reducer", err);
    }
  };
};

export const fetchCart = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/cart/${user.id}`);
      dispatch(_setCart(data));
    } catch (err) {}
  };
};

export const deleteItem = (userId, cartId, itemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/orders/cart/${userId}/${cartId}/${itemId}`
      );
      dispatch(_removeItem(data));
    } catch (err) {}
  };
};

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cartData;
    case REMOVE_ITEM:
      return action.cartData;
    default:
      return state;
  }
}
