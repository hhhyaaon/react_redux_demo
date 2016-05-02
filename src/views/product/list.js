import Immutable from "immutable"
import $ from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import {Link} from "react-router"
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import SearchBar from "../../components/searchBar"
import Icon from "antd/lib/icon"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import Table from "antd/lib/table"
import * as Actions from "../../actions/product.js"
import {tools} from "../../utils"
const InputGroup = Input.Group
const ButtonGrup = Button.Group



/**
 * 产品状态
 */
const stateEnum = {
    enable: 1,
    disable: 2
}

const stateEnumCn = {
    enum_1: "启用",
    enum_2: "禁用"
}


class ProductList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let {actions} = this.props;
        actions.getProductList();
    }
    render() {
        let state = this.props.$$productList.toJS();
        let cfg = {
            dataSource: state.products.data,
            rowKey: (r) => r.id,
            columns: [
                {
                    title: "产品",
                    dataIndex: "name",
                    key: "name",
                    render: (text, r) => {
                        return (<Link to="/product/detail">{text}</Link>);
                    }
                }, {
                    title: "通用名",
                    dataIndex: "commonName",
                    key: "commonName"
                }, {
                    title: "创建时间",
                    dataIndex: "createTime",
                    key: "createTime",
                    sorter: true,
                    render: (val) => {
                        return new Date(val).format("yyyy-MM-dd");
                    }
                }, {
                    title: "创建人",
                    dataIndex: "creater",
                    key: "creater"
                }, {
                    title: "状态",
                    dataIndex: "state",
                    key: "state",
                    sorter: true,
                    render: (text) => {
                        let iconMap = {
                            state_1: { type: "check-circle", color: "rgb(145,194,0)" },
                            state_2: { type: "cross-circle", color: "rgb(237,85,101)" },
                        }
                        return (
                            <div>
                                <Icon
                                    type={iconMap["state_" + text].type}
                                    style={{ "color": iconMap["state_" + text].color }}/>
                                <span>{stateEnumCn["enum_" + text]}</span>
                            </div>
                        );
                    }
                }
            ],
            onChange: (page, filter, sort) => {
                let {actions} = this.props;
                actions.getProductList({
                    page_index: page.current,
                    page_size: page.pageSize,
                    order: sort.field,
                    order_type: sort.order
                });
            },

            pagination: $.extend(true, tools.config.pagination),
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    let {actions} = this.props;
                    actions.getCheckedPdts(selectedRowKeys);
                }
            }
            //onRowClick: function (r) { Syp.router.gotoUrl(url.ProductDetail, { id: r.id }); }
        }
        return (
            <section>
                <div>产品列表</div>
                <Row>
                    <Col span="18">
                        <Button
                            type="primary"
                            size="large"
                            onClick={function () { console.log(this); this.props.history.push({ pathname: '/product/edit' }) }.bind(this) }>新增
                        </Button>
                        <ButtonGrup size="large">
                            <Button type="ghost" onClick={this.onClickEnable.bind(this) }>启用</Button>
                            <Button type="ghost" onClick={this.onClickDisable.bind(this) }>禁用</Button>
                            <Button type="ghost" onClick={this.onClickDelete.bind(this) }>删除</Button>
                        </ButtonGrup>
                    </Col>
                    <Col span="6">
                        <SearchBar
                            onSearch={this.onClickSearch.bind(this) }></SearchBar>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <Table {...cfg} bordered/>
                    </Col>
                </Row>
            </section>
        );
    }

    onClickSearch(keyword) {
        let {actions} = this.props;
        actions.getProductList({
            keyword: keyword,
            page_index: 1
        });
    }
    onClickEnable() {
        let checkedPdts = this.props.$$productList.get("checkedPdts").toJS();
        let {actions} = this.props;
        actions.changePdtsState(checkedPdts, stateEnum.disable);
    }
    onClickDisable() {
        let checkedPdts = this.props.$$productList.get("checkedPdts").toJS();
        let {actions} = this.props;
        actions.changePdtsState(checkedPdts, stateEnum.enable);
    }
    onClickDelete() {
        let checkedPdts = this.props.$$productList.get("checkedPdts").toJS();
        let {actions} = this.props;
        actions.deletePdts(checkedPdts);
    }
}


export default connect(
    (state) => {
        return {
            $$productList: state.$$productList
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch)
        }
    })(ProductList)
