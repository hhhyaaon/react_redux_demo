import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import {RouterContext, Router, Route, IndexRoute, hashHistory, withRouter } from "react-router"

import DevTools from "../devTools"

import "./assets/style/antd/antd.less"

import configureStore from "./store"

import {
  Layout,
  Home,
  ProductList,
  ProductDetail,
  ProductEdit} from "./views"

const store = configureStore();


class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router
            history={hashHistory}
            onUpdate={() => { window.scrollTo(0, 0) } }
            render={(props) => <RouterContext {...props}/>}>
            <Route path="/" component={Layout}>
              <IndexRoute component={Home}/>
              <Route path="product">
                <IndexRoute component={ProductList}/>
                <Route path="list" component={ProductList}/>
                <Route path="detail" component={ProductDetail}/>
                <Route path="edit" component={ProductEdit}/>
              </Route>
            </Route>
          </Router>

        </div>
      </Provider>
    )
  }
}
//  { (process.env.NODE_ENV === "production") ? null : <DevTools /> }
ReactDOM.render(
  <Root />,
  document.getElementById("sy")
)


