import { GET_OFFERS, DECLINE_OFFER } from "../actions/types";

const initialState = {
  offers: [],
  offer: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload
      };

    case DECLINE_OFFER:
      return {
        ...state,
        offers: state.offers.filter(offer => offer.offerId !== action.payload)
      };

    default:
      return state;
  }
}
