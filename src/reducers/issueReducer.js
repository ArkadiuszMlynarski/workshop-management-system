import {
  GET_ISSUES,
  GET_ISSUE,
  DELETE_ISSUE,
  GET_ISSUESOFFERED
} from "../actions/types";

const initialState = {
  issues: [],
  issue: { acceptedOffer: { workshop: {} } },
  issuesOffered: [{ offers: [], acceptedOffer: {} }]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES:
      return {
        ...state,
        issues: action.payload
      };

    case GET_ISSUE:
      return {
        ...state,
        issue: action.payload
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.issueId !== action.payload)
      };
    case GET_ISSUESOFFERED:
      return {
        ...state,
        issuesOffered: action.payload
      };

    default:
      return state;
  }
}
