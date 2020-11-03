import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./userReducer.js";
import itemsReducer from "./itemsReducer.js";
import singleItemReducer from "./singleItemReducer.js";
import cartReducer from "./cartReducer.js";
import allUsersReducer from "./allUsersReducer.js";

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  items: itemsReducer,
  singleItem: singleItemReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
