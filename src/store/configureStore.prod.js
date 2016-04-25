import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
//import { syncHistoryWithStore, routeReducer } from 'react-router-redux'
//import { browserHistory } from 'react-router'

//const reduxRouterMiddleware = syncHistoryWithStore(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(thunk),
  //applyMiddleware(reduxRouterMiddleware)
)(createStore);


export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}
