import React from "react"
import ReactDOM from "react-dom"
import Icon from "antd/lib/icon"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import classNames from 'classnames'
import $ from "jquery"
const InputGroup = Input.Group


/*
* 搜索栏组件SearchBar
* value:any         搜索栏输入框的值
* placeholder:any   搜索栏输入框placeholder
*
* onSearch:(value:string,e:ReactEvent)=>any     点击搜索栏输入框执行事件
*/
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = $.extend(true,{
            value:"",
            placeholder:"请输入查询关键字"
        },props);
    }
    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true
        });
        return (
            <InputGroup className={searchCls} style={this.props.style}>
                <Input 
                placeholder={this.state.placeholder}
                value={this.state.value} 
                onChange={this._onInputChange.bind(this)}
                onBlur={this._onInputBlur}/>
                <div className="ant-input-group-wrap">
                    <Button 
                    className={btnCls} 
                    size={this.props.size} 
                    onClick={this._onSearch.bind(this)}>
                        <Icon type="search" />
                    </Button>
                </div>
            </InputGroup>
        );
    }
    //变更输入框内容：更新this.state.value
    _onInputChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    //点击搜索按钮：调用父组件搜索函数
    _onSearch(e) {
        if (typeof this.props.onSearch === "function") {
            this.props.onSearch.call(this, this.state.value, e);
        }
    }
}