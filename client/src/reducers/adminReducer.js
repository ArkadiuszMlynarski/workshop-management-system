import {
  GET_USERS,
  DELETE_USER,
  FIND_USER,
  GET_WORKSHOPS,
  DELETE_WORKSHOP,
  ACCEPT_WORKSHOP,
  GET_OPINIONS,
  GET_PAGEDOPINIONS
} from "../actions/types";

const initialState = {
  users: { content: [] },
  user: { issues: [], roles: [], workshops: [] },
  workshops: { content: [] },
  opinions: { content: [] }
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
        users: {
          content: state.users.content.filter(
            user => user.id !== action.payload
          )
        }
      };

    case GET_WORKSHOPS:
      return {
        ...state,
        workshops: action.payload
      };

    case GET_PAGEDOPINIONS:
      return {
        ...state,
        opinions: action.payload
      };

    case DELETE_WORKSHOP:
      return {
        ...state,
        workshops: {
          content: state.workshops.content.filter(
            workshop => workshop.id !== action.payload
          )
        }
      };

    case ACCEPT_WORKSHOP:
      return {
        ...state,
        workshops: {
          content: state.workshops.content.filter(
            workshop => workshop.id !== action.payload
          )
        }
      };

    default:
      return state;
  }
}
