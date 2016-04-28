import React from "react"
import ReactDOM from "react-dom"
import Spin from "antd/lib/spin"
import Modal from "antd/lib/modal"
import Immutable from "immutable"

export default {
    /**
	 * 列表页每页显示条数
	 * @type {Number}
	 */
    listPageSize: 8,
    /**
    * 当前loading数
    * @type {Number}
    */
    loadingCount: 0,

    /**
     * 显示loading框
     * @return {[type]} 
     */
    showLoading: function () {
        if (this.loadingCount <= 0) {
            ReactDOM.render(
                <div className="sy-loadingwrap">
                    <Spin size="large"></Spin>
                </div>,
                document.getElementById("sy-loading")
            );
        }
        this.loadingCount++;
    },
    /**
     * 隐藏loading框
     * @return {[type]} 
     */
    hideLoading: function () {
        this.loadingCount--;
        if (this.loadingCount === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("sy-loading"));
        }

    },
    /**
     * 删除所有loading框
     * @return {[type]} 
     */
    closeLoading: function () {
        this.loadingCount = 1;
        this.hideLoading();
    },

    /**
     * 显示提示框
     * 调用方式component.showDialog.xxx(content,okCb,cfg);
     * @param {ReactDOM，String} [content] [弹出内容] 
     * @param {Function} [okCb] [点击确定是回调函数] 
     * @param {Object} [cfg] [Modal配置项] 
     *
     * Dialog类型：
     * success:成功
     * error:失败
     * info:提示信息
     * confirm:确认
     */
    showDialog: (function () {
        let $$mode = Immutable.fromJS({
            success: { title: "成功" },
            error: { title: "失败" },
            info: { title: "信息" },
            confirm: { title: "确认" }
        })
        let $$returnModal = Immutable.Map();

        $$mode.map(function ($$val, key) {
            $$returnModal = $$returnModal.set(key, function (content, okCb, cfg) {
                Modal[key](Object.assign({
                    title: $$val.get("title"),
                    content: content,
                    onOk: typeof okCb === "function" ? okCb : function () { }
                }, cfg));
            });
        });
        return $$returnModal.toJS();
    } ()),

    /**
	 * 删除所有dialog
	 * @return {[type]} 
	 */
    closeDialog: function () {
        let selectors = document.querySelectorAll(".ant-modal-container") || [];
        Array.prototype.slice.call(selectors).map(function (ele) {
            ReactDOM.unmountComponentAtNode(ele);
        });
    }
};