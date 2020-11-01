const axios = require("axios");

const GET_ITEM = "GET_ITEM";

const _getItem = (singleItem) => {
  return {
    type: GET_ITEM,
    singleItem,
  };
};

export const getItem = ({ id }) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/items/${id}`);
    dispatch(_getItem(response.data));
  };
};

export default function singleItemReducer(state = [], action) {
  if (action.type === GET_ITEM) {
    state = action.singleItem;
  }
  return state;
}
