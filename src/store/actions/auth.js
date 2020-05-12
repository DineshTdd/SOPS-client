import { push } from "connected-react-router";
import axios from "axios";

export const SET_USER_SESSION = "SET_USER_SESSION";

export const userSignup = (userDetails) => {
  return async (dispatch, getState) => {
    try {
      await axios
        .post("http://localhost:8626/user/register", userDetails)
        .then(function (response) {
          alert("Sign up successful!");
          dispatch(push("/home"));
        })
        .catch(function (error) {
          alert(`${error.response.data.message} try again`);
          // browserHistory.push('/Signup')
          dispatch(push("/signup"));
        });
    } catch (err) {
      console.error(err);
      alert("Something went wrong please try again");
    }
  };
};

export const userLogin = (userDetails) => {
  return async (dispatch) => {
    try {
      await axios
        .post("http://localhost:8626/user/login", userDetails)
        .then(async function (response) {
          const { user, token } = response.data.result;
          console.log(user, token);
          dispatch(setUser(user, token));
        })
        .catch(function (error) {
          console.log(error);
          alert(`${error.response.data.message} try again`);
          // browserHistory.push('/Signup')
          dispatch(push("/"));
        });
    } catch (err) {
      console.error(err);
      alert("Something went wrong please try again");
    }
  };
};

export const setUser = (user, token) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_USER_SESSION,
        payload: { user, token },
      });
      dispatch(push("/"));
    } catch (err) {
      alert("Please try login again!");
    }
  };
};
