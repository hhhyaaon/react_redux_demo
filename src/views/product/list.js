import React from "react"
import ReactDOM from "react-dom"
import {Link} from "react-router"
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import SearchBar from "../../components/searchBar"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import Table from "antd/lib/table"
const InputGroup = Input.Group;
const ButtonGrup = Button.Group;

import * as Actions from "../../actions/product.js"
import Immutable from "immutable"


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
                    render: (val) => {
                        return new Date(val).format("yyyy-MM-dd");
                    },
                    sorter: true
                }, {
                    title: "创建人",
                    dataIndex: "creater",
                    key: "creater"
                }, {
                    title: "状态",
                    dataIndex: "state",
                    key: "state"
                }
            ],
            onChange: (page, filter, sort) => {
                if (typeof this.props.onFilter != "function") return;
                // return this.props.onFilter.call(this, {
                //     page_index: page.current,
                //     page_size: page.pageSize,
                //     order: sort.field,
                //     order_type: sort.order
                // });
            },
            // pagination: $.extend(true, Syp.util.config.pagination, {
            //     current: this.props.dataSource.pageIndex,
            //     pageSize: this.props.dataSource.pageSize
            // }),
            rowSelection: {
                onChange: function (selectedRowKeys, selectedRows) {
                    _this.props.onChkChange.apply(_this, $.makeArray(arguments));
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
                            <Button type="ghost" onClick={this.onClickEnable}>启用</Button>
                            <Button type="ghost" onClick={this.onClickDisable}>禁用</Button>
                        </ButtonGrup>
                    </Col>
                    <Col span="6">
                        <SearchBar
                            onSearch={this.onClickSearch.bind(this) }></SearchBar>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                        <Table {...cfg} border/>
                    </Col>
                </Row>
            </section>
        );
    }

    onClickSearch(keyword) {
        let {actions} = this.props;
        actions.getProductList();
    }
    onClickEnable() { }
    onClickDisable() { }
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
