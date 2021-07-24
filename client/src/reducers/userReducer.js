import { GET_USER } from "../actions/types";

const initialState = {
  user: { roles: [], workshops: [] }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
