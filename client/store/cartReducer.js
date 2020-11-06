import axios from "axios";

const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const _setCart = (cartData) => {
  return {
    type: SET_CART,
    cartData,
  };
};

const _addItem = (cartData) => {
  return {
    type: ADD_ITEM,
    cartData,
  };
};

const _removeItem = (cartData) => {
  return {
    type: REMOVE_ITEM,
    cartData,
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

export const addItem = (userId, cartId, itemId) => {
  return async (dispatch) => {
    try {
      console.log("!!!", itemId);
      const { data } = await axios.post(
        `/api/orders/cart/${userId}/${cartId}/${itemId}`
      );
      dispatch(_addItem(data));
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
    case ADD_ITEM:
      return action.cartData;
    case REMOVE_ITEM:
      return action.cartData;
    default:
      return state;
  }
}
