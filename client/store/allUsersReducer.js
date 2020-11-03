const axios = require("axios");

const ADD_USER = "ADD_USER";

const createUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(createUser((await axios.post("/api/users", user)).data));
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [action.user, ...state];
    default:
      return state;
  }
}
