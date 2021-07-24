import { GET_OPINIONS } from "../actions/types";

const initialState = {
  opinions: [],
  opinion: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OPINIONS:
      return {
        ...state,
        opinions: action.payload
      };

    default:
      return state;
  }
}
