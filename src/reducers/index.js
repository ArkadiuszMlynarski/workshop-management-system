import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import issueReducer from "./issueReducer";
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import workshopReducer from "./workshopReducer";
import offerReducer from "./offerReducer";
import opinionReducer from "./opinionReducer";

export default combineReducers({
  errors: errorReducer,
  issue: issueReducer,
  backlog: backlogReducer,
  security: securityReducer,
  actualUser: userReducer,
  adminPanel: adminReducer,
  workshop: workshopReducer,
  offer: offerReducer,
  opinion: opinionReducer
});
