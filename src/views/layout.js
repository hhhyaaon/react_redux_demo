import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {Link} from "react-router"
import Button from "antd/lib/button"

import store from "../store"
import * as action from "../actions/layout.js"

import "../assets/style/views/index.scss"


class Layout extends React.Component {
  constructor(props) {
    console.log("props", props);
    super(props);
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div id="sy-ctnwrap">
          <div id="sy-menuwrap">
            <div className="sy-logo">
              <h2>Synapse</h2>
            </div>
            <div id="sy-menu">
              <_Menu/>
            </div>
          </div>

          <div>
            <div id="sy-header"></div>
            <div id="sy-ctn">{ this.props.children }</div>
          </div>
        </div>

        <span id="sy-loading"></span>
      </div>
    )
  }
}

class _Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        type="primary"
        onClick = {this.click}
        >测试</Button>
    )
  }
  click() {
    console.log("views", action);
    //action.click("cccc");
    store.dispatch(action.click("xxxx"))
  }
}


export default connect(
  (state) => {
    console.warn("state",state);
    return {
      menus: state.menus
    }
  },
  (dispatch) => {
    console.warn("dispatch",dispatch);
    return {
      actionxx: bindActionCreators(action, dispatch)
    }
  })(Layout)