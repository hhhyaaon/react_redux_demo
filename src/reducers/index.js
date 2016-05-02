import { combineReducers } from "redux"

import $$layout from "./layout.js"
import $$productList from "./product/list.js"
import $$productEdit from "./product/edit.js"

const rootReducer = combineReducers({
  $$layout,
  $$productList,
  $$productEdit
});

export default rootReducer;
