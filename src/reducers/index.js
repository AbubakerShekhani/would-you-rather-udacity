import { combineReducers } from "redux";
import users from "./users";
import authentication from "./authentication";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  users,
  authentication,
  questions,
  loadingBar: loadingBarReducer
});
