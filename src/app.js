import React from "react"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"

import DevTools from "../devTools"

import "./assets/style/antd.css"
// import "./src/assets/style/font-awesome.css"
// import "./src/assets/style/style.css"

import configureStore from "./store"

import {Layout, Home, ProductList} from "./views"

const store = configureStore();
const history = syncHistoryWithStore(browserHistory,store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history} onUpdate={() => { window.scrollTo(0, 0) } }>
            <Route path="/" component={Layout}>
              <IndexRoute component={Home}/>
              <Route path="product">
                <Route path="list" component={ProductList}/>
                <Route path="detail" component={ProductList}/>
                <Route path="edit" component={ProductList}/>
              </Route>
            </Route>
          </Router>
          { (process.env.NODE_ENV === "production") ? null : <DevTools /> }
        </div>
      </Provider>
    )
  }
}
