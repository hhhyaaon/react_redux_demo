import React from "react"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { syncHistory } from "react-router-redux"

import DevTools from "./devTools"

import "./src/assets/style/antd.css"
// import "./src/assets/style/font-awesome.css"
// import "./src/assets/style/style.css"

import configureStore from "./src/store"

import {Layout, Home, ProductList} from "./src/views"

const reduxRouterMiddleware = syncHistory(hashHistory)
const store = configureStore()
reduxRouterMiddleware.listenForReplays(store)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory} onUpdate={() => { window.scrollTo(0, 0) } }>
            <Route path="/" component={Layout}>
              <IndexRoute component={Home}/>
              <Route path="product" component={ProductList}/>
            </Route>
          </Router>
          { (process.env.NODE_ENV === "production") ? null : <DevTools /> }
        </div>
      </Provider>
    )
  }
}
