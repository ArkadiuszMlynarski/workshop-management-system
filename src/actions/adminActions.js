import axios from "axios";
import {
  GET_USERS,
  DELETE_USER,
  FIND_USER,
  GET_ERRORS,
  GET_WORKSHOPS,
  DELETE_WORKSHOP,
  ACCEPT_WORKSHOP
} from "./types";

export const getUsers = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/admin/getUsers");
  dispatch({
    type: GET_USERS,
    payload: res.data
  });
};

export const deleteUser = id => async dispatch => {
  if (window.confirm(`Are you sure? This will delete user with ID: ${id}.`)) {
    await axios.delete(`http://localhost:8081/admin/deleteUserById/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  }
};

export const addAdmin = (id, history) => async dispatch => {
  if (window.confirm(`Are you sure? This will add admin role`)) {
    try {
      await axios.patch(`http://localhost:8081/admin/addAdmin/${id}`);
      history.push("/admin/userList");
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
  }
};

export const findUser = (id, history) => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:8081/admin/findUserById/${id}`
    );
    dispatch({
      type: FIND_USER,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const adminEditUser = (user, history) => async dispatch => {
  try {
    await axios.patch("http://localhost:8081/admin/AdminEditUser", user);
    history.push("/admin/userList");
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

export const getWorkshops = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/admin/getWorkshops");
  dispatch({
    type: GET_WORKSHOPS,
    payload: res.data
  });
};

export const acceptWorkshop = id => async dispatch => {
  if (window.confirm(`Do you want to accept workshop with ID: ${id}?`)) {
    await axios.patch(`http://localhost:8081/admin/acceptWorkshop/${id}`);
    dispatch({
      type: ACCEPT_WORKSHOP,
      payload: id
    });
  }
};

export const deleteWorkshop = id => async dispatch => {
  if (
    window.confirm(`Are you sure? This will delete workshop with ID: ${id}.`)
  ) {
    await axios.delete(`http://localhost:8081/admin/deleteWorkshopById/${id}`);
    dispatch({
      type: DELETE_WORKSHOP,
      payload: id
    });
  }
};
