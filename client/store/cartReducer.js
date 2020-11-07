import axios from "axios";

const SET_CART = "SET_CART";

const _setCart = (cartData) => {
  return {
    type: SET_CART,
    cartData,
  };
};

export const mergeCartOnLogin = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orders/mergeCart", {
        user,
        history,
      });
      dispatch(_setCart(data));
    } catch (err) {
      console.log("err in merge on login, cartReducer");
    }
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

export const addItem = (userId, cartId, itemId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/orders/cart/${userId}/${cartId}/${itemId}`
      );
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
      dispatch(_setCart(data));
    } catch (err) {}
  };
};

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...action.cartData };
    default:
      return state;
  }
}
