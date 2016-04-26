import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
//import main from "./main.reducer"

import layout from "./layout.js"

const rootReducer = combineReducers(Object.assign({}, {
  layout,
  routing: routerReducer
}));

export default rootReducer;
