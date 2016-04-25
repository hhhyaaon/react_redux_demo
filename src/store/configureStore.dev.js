import { createStore, applyMiddleware, compose } from "redux"
import { persistState } from "redux-devtools"
import thunk from "redux-thunk"
import DevTools from "../../devTools"
//import { syncHistoryWithStore, routeReducer } from "react-router-redux"
//import { browserHistory } from "react-router"
import reducer from "../reducers"

//const reduxRouterMiddleware = syncHistoryWithStore(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(thunk),
  //applyMiddleware(reduxRouterMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore)


export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers").default)
    );
  }

  return store
}
