const axios = require("axios");

const GET_ITEMS = "GET_ITEMS";

const _getItems = (items) => {
  return {
    type: GET_ITEMS,
    items,
  };
};

export const getItems = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/items");
    dispatch(_getItems(response.data));
  };
};

export default function itemsReducer(state = [], action) {
  if (action.type === GET_ITEMS) {
    state = action.items;
  }
  return state;
}
