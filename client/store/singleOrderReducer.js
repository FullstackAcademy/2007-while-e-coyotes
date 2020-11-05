const axios = require("axios");

const GET_ORDER = "GET_ORDER";

const _getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/orders/${id}`);
    dispatch(_getOrder(response.data));
  };
};

export default function singleOrderReducer(state = {}, action) {
  if (action.type === GET_ORDER) {
    state = action.order;
  }

  return state;
}
