import {
  GET_BACKLOG,
  GET_ISSUE_TASK,
  DELETE_ISSUE_TASK
} from "../actions/types";

const initialState = {
  issue_tasks: [],
  issue_task: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        issue_tasks: action.payload
      };

    case GET_ISSUE_TASK:
      return {
        ...state,
        issue_task: action.payload
      };

    case DELETE_ISSUE_TASK:
      return {
        ...state,
        issue_tasks: state.issue_tasks.filter(
          issue_task => issue_task.issueSequence !== action.payload
        )
      };

    default:
      return state;
  }
}
