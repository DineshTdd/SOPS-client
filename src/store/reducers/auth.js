import { SET_USER_SESSION, REMOVE_USER_SESSION } from "../actions/auth";
let token = localStorage.getItem("Authorization");
let _id = localStorage.getItem("_id");
let email = localStorage.getItem("email");
let username = localStorage.getItem("username");
let loggedInAt = localStorage.getItem("loggedInAt");
const initialState = {
  isUserLoggedIn: token ? true : false,
  userData: {
    _id: _id !== null || _id !== undefined ? _id : undefined,
    token: token !== null || token !== undefined ? token : undefined,
    username: username !== null || token !== undefined ? username : undefined,
    email: email !== null || token !== undefined ? email : undefined,
    loggedInAt: loggedInAt !== null || loggedInAt !== undefined ? loggedInAt : undefined,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SESSION:
      const { user, token } = action.payload;
      const { email, username, _id } = user;
      const createdAt = new Date();
      localStorage.setItem("Authorization", token);
      localStorage.setItem("_id", _id);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      localStorage.setItem("loggedInAt", createdAt);
      return {
        ...state,
        isUserLoggedIn: true,
        userData: {
          _id,
          token,
          email,
          username,
          loggedInAt: createdAt,
        },
      };
    case REMOVE_USER_SESSION:
      localStorage.removeItem("Authorization");
      localStorage.removeItem("_id");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("loggedInAt");
      return {
        ...state,
        isUserLoggedIn: false,
        userData: {
          _id: undefined,
          token: undefined,
          email: undefined,
          username: undefined,
          loggedInAt: undefined,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
