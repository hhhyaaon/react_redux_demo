import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {Link} from "react-router"
import Immutable from "immutable"
import Button from "antd/lib/button"
import Menu from "../components/menu"
import * as Actions from "../actions/layout.js"


import "../assets/style/views/index.less"

const menuItemUrl = {
  "2-1": "/product/list",
  "2-2": "/product/detail"
}


class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let {actions} = this.props;
    actions.getMenu();
  }
  render() {
    let menus = this.props.$$layout.get("$$menus", Immutable.List()).toJS();

    return (
      <div>
        <div id="sy-ctnwrap">
          <div id="sy-menuwrap">
            <div className="sy-logo">
              <h2>Synapse</h2>
            </div>
            <div id="sy-menu">
              <Menu
                dataSource={ menus }
                dataValueField="id"
                dataTextField="name"
                onClick={this.onClick.bind(this) }></Menu>
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
  onClick(item) {
    this.props.history.push({
      pathname: menuItemUrl[item.key]
    })
  }
}




export default connect(
  (state) => {
    return {
      $$layout: state.$$layout
    }
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(Actions, dispatch)
    }
  })(Layout)