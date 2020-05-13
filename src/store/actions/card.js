import { push } from "connected-react-router";
import axios from "axios";

export const addCard = (cardDetails, onSuccess, onFailure) => {
  return async (dispatch, getState) => {
    try {
      await axios
        .post("http://localhost:8626/cards/new", cardDetails)
        .then((response) => {
          onSuccess(response);
        })
        .catch((err) => {
          onFailure(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};
