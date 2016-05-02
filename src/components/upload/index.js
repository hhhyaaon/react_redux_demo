import $ from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import Upload from "antd/lib/upload"
import Icon from "antd/lib/icon"

const Dragger = Upload.Dragger

export default class _Upload extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const defProps = {
            action: "",
            data: {},
            beforeUpload: $.noop
        }
        let _props = this.props;
        let props = $.extend(true, {}, defProps, _props);
        defProps.beforeUpload = function () {
            //校验文件类型
            //校验文件大小
            
            if (typeof _props.beforeUpload === "function") {
                return _props.beforeUpload.apply(this, $.makeArray(arguments));
            }
        }

        return (
            <div>
                <span>上传图片</span>
                <div style={{ marginTop: 5, height: 180 }}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="cloud-upload-o" />
                        </p>
                        <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                        <p className="ant-upload-hint">支持扩展名：.png.jpg</p>
                    </Dragger>
                </div>
            </div>
        );

    }

} 