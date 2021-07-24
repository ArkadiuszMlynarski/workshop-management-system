import { GET_WORKSHOP, GET_OWNERWORKSHOPS } from "../actions/types";

const initialState = {
  workshop: {},
  workshops: [{}]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WORKSHOP:
      return {
        ...state,
        workshop: action.payload
      };
    case GET_OWNERWORKSHOPS:
      return {
        ...state,
        workshops: action.payload
      };
    default:
      return state;
  }
}
