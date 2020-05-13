import { push } from "connected-react-router";
import axios from "axios";

export const SET_USER_SESSION = "SET_USER_SESSION";
export const REMOVE_USER_SESSION = "REMOVE_USER_SESSION";

export const userSignup = (userDetails) => {
  return async (dispatch, getState) => {
    try {
      await axios
        .post("http://localhost:8626/user/register", userDetails)
        .then(function (response) {
          alert("Sign up successful!");
          dispatch(push("/signin"));
        })
        .catch(function (error) {
          alert(`${error.response.data.message} try again`);
        });
    } catch (err) {
      console.error(err);
      alert("Something went wrong please try again");
    }
  };
};

export const userLogin = (userDetails, onSuccess, onFailure) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:8626/user/login", userDetails)
        .then(async function (response) {
          const { user, token } = response.data.result;
          if (user && token) {
            console.log(user, token);
            return dispatch(setUser(user, token, onSuccess, onFailure));
          }
          return;
        })
        .catch(function (error) {
          console.log(error.response);
          if (error?.response?.data?.error?.message) {
            return onFailure(error?.response?.data?.error?.message);
          }
          return onFailure("Logging you in failed! Try again!");
        });
    } catch (err) {
      return onFailure("Something went wrong! Please try again");
    }
  };
};

export const setUser = (user, token, onSuccess, onFailure) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_USER_SESSION,
        payload: { user, token },
      });
      onSuccess();
    } catch (err) {
      onFailure("Please try logging again!");
    }
  };
};

export const removeUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: REMOVE_USER_SESSION,
      });
      dispatch(push("/"));
    } catch (err) {}
  };
};
