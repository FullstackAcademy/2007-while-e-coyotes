const axios = require("axios");

const GET_USERS = "GET_USERS";
const UPDATE_USER = "UPDATE_USER";
const CREATE_USER = "CREATE_USER";
const DESTROY_USER = "DESTROY_USER";

const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const _destroyUser = (id) => {
  return {
    type: DESTROY_USER,
    id,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/users");
    dispatch(_getUsers(response.data));
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${user.id}`, user);
    dispatch(_updateUser(response.data));
    history.push(`/admin/users/${user.id}`);
  };
};

export const createUser = (user, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/users", user);
    dispatch(_createUser(res.data));
    history.push("/admin/users");
  };
};

export const destroyUser = ({ id }) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${id}`);
    dispatch(_destroyUser(id));
  };
};

export default function usersReducer(state = [], action) {
  if (action.type === GET_USERS) {
    state = action.users;
  }
  if (action.type === UPDATE_USER) {
    state = state.map((user) => {
      return user.id === action.user.id ? action.user : user;
    });
  }
  if (action.type === CREATE_USER) {
    state = [action.user, ...state];
  }
  if (action.type === DESTROY_USER) {
    state = state.filter((user) => {
      return user.id !== action.id * 1;
    });
  }
  return state;
}
