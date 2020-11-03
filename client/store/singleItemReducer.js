const axios = require("axios");

const GET_ITEM = "GET_ITEM";

const _getItem = (item) => {
  return {
    type: GET_ITEM,
    item,
  };
};

export const getItem = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/items/${id}`);
    dispatch(_getItem(response.data));
  };
};

export default function singleItemReducer(state = { reviews: [] }, action) {
  if (action.type === GET_ITEM) {
    state = action.item;
  }
  return state;
}
