import axios from "axios";
import { GET_ERRORS, GET_USER } from "./types";

export const getUser = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/users/getUser");
  dispatch({
    type: GET_USER,
    payload: res.data
  });
};

export const editUser = (user, history) => async dispatch => {
  try {
    await axios.patch("http://localhost:8081/users/editUser", user);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
