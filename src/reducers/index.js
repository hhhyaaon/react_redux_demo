// import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
//import main from "./main.reducer"

import $$layout from "./layout.js"
import $$productList from "./product/list.js"

const rootReducer = combineReducers({
  $$layout,
  $$productList
  // routing: routerReducer
});

export default rootReducer;
