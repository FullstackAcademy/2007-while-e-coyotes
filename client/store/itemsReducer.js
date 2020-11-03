const axios = require("axios");
import { searchFilter } from "../utils/index";

const GET_ITEMS = "GET_ITEMS";
const UPDATE_ITEM = "UPDATE_ITEM";
const CREATE_ITEM = "CREATE_ITEM";
const DESTROY_ITEM = "DESTROY_ITEM";

const _getItems = (items) => {
  return {
    type: GET_ITEMS,
    items,
  };
};

const _updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};

const _createItem = (item) => {
  return {
    type: CREATE_ITEM,
    item,
  };
};

const _destroyItem = (id) => {
  return {
    type: DESTROY_ITEM,
    id,
  };
};

export const getItems = (searchString) => {
  return async (dispatch) => {
    const response = await axios.get("/api/items");
    if (searchString === undefined) {
      dispatch(_getItems(response.data));
    } else {
      dispatch(_getItems(searchFilter(response.data, searchString)));
    }
  };
};

export const updateItem = (item, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/items/${item.id}`, item);
    dispatch(_updateItem(response.data));
    history.push(`/items/${item.id}`);
  };
};

export const createItem = (item, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/items", item);
    dispatch(_createItem(res.data));
    history.push("/items");
  };
};

export const destroyItem = ({ id }, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`);
    dispatch(_destroyItem(id));
    history.push("/items");
  };
};

export default function itemsReducer(state = [], action) {
  if (action.type === GET_ITEMS) {
    state = action.items;
  }
  if (action.type === UPDATE_ITEM) {
    state = state.map((item) => {
      return item.id === action.item.id ? action.item : item;
    });
  }
  if (action.type === CREATE_ITEM) {
    state = [action.item, ...state];
  }
  if (action.type === DESTROY_ITEM) {
    state = state.filter((item) => {
      return item.id !== action.id * 1;
    });
  }
  return state;
}
