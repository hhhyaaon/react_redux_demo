
import React from "react"
import ReactDOM from "react-dom"
import _Menu from "antd/lib/menu"
import _Icon from "antd/lib/icon"
import "whatwg-fetch"
import "es6-promise"


export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openItems: []
    }
  }
  render() {
    let {dataSource, dataTextField, dataValueField} = this.props;
    let menuJsx = dataSource.map(function (menu, i) {
      //是否含有子项
      if (menu.sub && menu.sub.length > 0) {
				var items = menu.sub.map(function (item) {
					return (
						<_Menu.Item key={item[dataValueField]}>{item[dataTextField]}</_Menu.Item>
					);
				});
				return (
					<_Menu.SubMenu
            key={menu[dataValueField]}
            title={<span><_Icon type="mail"/> <span>{menu[dataTextField]}</span></span>}
            children={items}>
					</_Menu.SubMenu>
				)
			} else {
				return (
					<_Menu.Item key={menu[dataValueField]} >
						<_Icon type="mail"/>
						<span>{menu[dataTextField]}
						</span>
					</_Menu.Item>
				)
			}
		});
    return (
      <_Menu
				mode="inline"
				openKeys={this.state.openItems}
				onOpen={this._onChangeOpen.bind(this) }
				onClose={this._onChangeOpen.bind(this) }
				onClick={this.onClick.bind(this) }>
				{menuJsx}</_Menu>
    );
  }
  _onChangeOpen(sub) {
		//仅展开当前选中目录
		this.setState({
			openItems: (sub.open ? [sub.key] : [])
		});
	}
	onClick(item) {
		this.props.onClick.apply(this, Array.prototype.slice.call(arguments));
	}

}
