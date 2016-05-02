import Immutable from "immutable"
import $ from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import Form from "antd/lib/form"
import Input from "antd/lib/input"
import Select from "antd/lib/select"
import DatePicker from "antd/lib/date-picker"
import Button from "antd/lib/button"
import Upload from "../../components/upload"
import * as Actions from "../../actions/product.js"
const FormItem = Form.Item
const InputGroup = Input.Group
const Option = Select.Option


/**
 * 医保类型
 */
const typeEnum = {
    classA: 1,
    classB: 2
}

const typeEnumCn = {
    "1": "甲类",
    "2": "乙类"
}


class ProductEdit extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <section>
                <div>
                    <Button
                        type="primary"
                        onClick={this.savePdt.bind(this) }>保存</Button>
                </div>
                <Row>
                    <Col span="14">
                        <_Form
                            actions={this.props.actions}
                            $$productEdit={this.props.$$productEdit}/>
                    </Col>
                    <Col span="7" offset="3">
                        <Upload/>
                    </Col>
                </Row>
            </section>
        )
    }
    savePdt() {
        let fields = this.props.$$productEdit.toJS().product;
        let {actions} = this.props;
        actions.savePdt(fields);
    }
}

class _Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form horizontal>
                <FormItem {...formItemLayout} label="产品名称：">
                    <Input
                        type="text"
                        placeholder="请输入内容"
                        {...getFieldProps("name") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="英文名称：">
                    <Input
                        type="text"
                        placeholder="请输入内容"
                        {...getFieldProps("engName") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="英文名称：">
                    <Input
                        type="text"
                        placeholder="请输入内容"
                        {...getFieldProps("comName") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="价格：">
                    <InputGroup>
                        <Input
                            type="text"
                            addonAfter="/ 盒"
                            placeholder="请输入内容"
                            {...getFieldProps("price") } />
                    </InputGroup>
                </FormItem>
                <FormItem {...formItemLayout} label="医保类型：">
                    <Select
                        defaultValue={"1" }
                        {...getFieldProps("type") }  >
                        {
                            function () {
                                let opts = [];
                                $.each(typeEnumCn, (key, val) => {
                                    opts.push(<Option key={key} value={key}>{val}</Option>);
                                });
                                return opts;
                            } ()
                        }
                    </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="上市时间：">
                    <DatePicker
                        {...getFieldProps("publishTime") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="成分：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("component") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="治疗领域：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("ta") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="用法用量：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("usage") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="不良反应：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("effect") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="配方禁忌：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("taboo") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="注意事项：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("notic") }  />
                </FormItem>
                <FormItem {...formItemLayout} label="药物分类：">
                    <Input
                        type="textarea"
                        placeholder="请输入内容"
                        {...getFieldProps("category") }  />
                </FormItem>
            </Form >
        );
    }
}
_Form = Form.create({
    onFieldsChange: function (props, fields) {
        //将变化的值存入redux store
        let {actions} = props;
        actions.setPdt(fields);
    },
    mapPropsToFields: function (props) {
        //读取redux store
        return props.$$productEdit.toJS().product;
    }
})(_Form);

export default connect(
    (state) => {
        return {
            $$productEdit: state.$$productEdit
        }
    },
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch)
        }
    }
)(ProductEdit)
