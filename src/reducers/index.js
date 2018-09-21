import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import vendors from "./vendors";
import vendorMap from "./vendorMap";
import fileDetails from "./fileDetails";
import search from "./search";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  vendors: vendors,
  vendorMap: vendorMap,
  fileDetails: fileDetails,
  search: search
});
