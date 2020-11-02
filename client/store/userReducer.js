const axios = require("axios");

const SET_USER = "SET_USER";

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const validateLogin = (loginInfo, history) => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/login", loginInfo, {
      credentials: "same-origin",
    });
    dispatch(setUser(data));
    history.push("/");
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/onPageLoad");
    dispatch(setUser(data));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    // delete request to logout route
    await axios.delete("/auth/logout");
    //fetch a new guest user from /auth/onPageLoad, and set it to state
    const { data } = await axios.post("/auth/onPageLoad");
    dispatch(setUser(data));
  };
};

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
