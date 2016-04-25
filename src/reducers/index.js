import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
//import main from "./main.reducer"

const rootReducer = combineReducers(Object.assign({}, {
  //main,
  routing: routerReducer
}));

export default rootReducer
