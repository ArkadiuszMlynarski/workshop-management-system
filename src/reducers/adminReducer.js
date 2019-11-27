import {
  GET_USERS,
  DELETE_USER,
  FIND_USER,
  GET_WORKSHOPS,
  DELETE_WORKSHOP,
  ACCEPT_WORKSHOP
} from "../actions/types";

const initialState = {
  users: [],
  user: { issues: [], roles: [], workshops: [] },
  workshops: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case FIND_USER:
      return {
        ...state,
        user: action.payload
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };

    case GET_WORKSHOPS:
      return {
        ...state,
        workshops: action.payload
      };

    case DELETE_WORKSHOP:
      return {
        ...state,
        workshops: state.workshops.filter(
          workshop => workshop.id !== action.payload
        )
      };

    case ACCEPT_WORKSHOP:
      return {
        ...state,
        workshops: state.workshops.filter(
          workshop => workshop.id !== action.payload
        )
      };

    default:
      return state;
  }
}
