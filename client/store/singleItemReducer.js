const axios = require("axios");

const GET_ITEM = "GET_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const CREATE_ITEM = "CREATE_ITEM";
const DESTROY_ITEM = "DESTROY_ITEM";

const _getItem = (item) => {
  return {
    type: GET_ITEM,
    item,
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

export const getItem = ({ id }) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/items/${id}`);
    dispatch(_updateItem(response.data));
  };
};

export const updateItem = ({
  name,
  description,
  price,
  imageUrl,
  id,
  history,
}) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/items/${id}`, {
      name,
      description,
      price,
      imageUrl,
    });
    dispatch(_getItem(response.data));
    history.push("/items");
  };
};

export const createItem = ({ name, history }) => {
  return async (dispatch) => {
    const res = await axios.post("/api/items", { name });
    dispatch(_createItem(res.data));
    history.push("/items");
  };
};

export const destroyItem = ({ id }) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`);
    dispatch(_destroyItem(id));
  };
};

export default function singleItemReducer(state = [], action) {
  if (action.type === GET_ITEM) {
    state = action.item;
  }
  if (action.type === UPDATE_ITEM) {
    state = state.map((item) =>
      item.id === action.item.id ? action.item : item
    );
  }
  if (action.type === CREATE_ITEM) {
    state = [action.item, ...state];
  }
  if (action.type === DESTROY_ITEM) {
    state = state.filter((item) => item.id !== action.id * 1);
  }
  return state;
}
