const axios = require("axios");

const GET_ORDERS = "GET_ORDERS";
const UPDATE_ORDER = "UPDATE_ORDER";

const _getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const _updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/orders");
    dispatch(_getOrders(response.data));
  };
};

export const updateOrder = (order) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/orders/${order.id}`);
    dispatch(_updateOrder(response.data));
  };
};

export default function ordersReducer(state = [], action) {
  if (action.type === GET_ORDERS) {
    state = action.orders;
  }
  if (action.type === UPDATE_ORDER) {
    state = state.map((order) => {
      return order.id === action.order.id ? action.order : order;
    });
  }
  return state;
}
