import React from "react"
import ReactDOM from "react-dom"
import Spin from "antd/lib/spin"
import Modal from "antd/lib/modal"
import $ from "jquery"
import core from "./core.js"


const tools = {
    /**
	 * 列表页每页显示条数
	 * @type {Number}
	 */
    listPageSize: 10,
    /**
    * 当前loading数
    * @type {Number}
    */
    loadingCount: 0,

    /**
     * 显示loading框
     * @return {[type]} 
     */
    showLoading() {
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
    hideLoading() {
        this.loadingCount--;
        if (this.loadingCount === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("sy-loading"));
        }

    },
    /**
     * 删除所有loading框
     * @return {[type]} 
     */
    closeLoading() {
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
        let mode = {
            success: { title: "成功" },
            error: { title: "失败" },
            info: { title: "信息" },
            confirm: { title: "确认" }
        };
        let returnModal = {};
        $.map(mode, function (val, key) {
            returnModal[key] = function (content, okCb, cfg) {
                Modal[key]($.extend(true, {
                    title: val.title,
                    content: content,
                    onOk: typeof okCb === "function" ? okCb : function () { }
                }, cfg));
            };
        });
        return returnModal;
    } ()),

    /**
	 * 删除所有dialog
	 * @return {[type]} 
	 */
    closeDialog() {
        let selectors = document.querySelectorAll(".ant-modal-container") || [];
        Array.prototype.slice.call(selectors).map(function (ele) {
            ReactDOM.unmountComponentAtNode(ele);
        });
    },


};

$.extend(true, tools, {
    /**
	 * antd 组件config
	 * @type {Object}
	 */
    config: {
		/**
		 * 分页插件config
		 * @type {Object}
		 */
        pagination: {
            size: "small",
            total: 0,
            pageSizeOptions: ['5', '10', '15', '20'],
            current:1,
            pageSize: tools.listPageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: $.noop
        }
    },
    /**
     * 封装ajax：
     *【调用方法】: MainPage.ajax({});
     *【配置参数】：
     * 支持原$.ajax所有config，此外新增：
     * info ：请求信息，用于错误/正确信息提示（格式：[动词]+[操作项]，如：获取文章列表，保存科室信息...）
     * result ：返回值res.data对应数据类型，调用方式：MainPage.ajax.resultEnum.xxx
     *   - array : 数组（默认）
     *   - bool ：布尔值
     *   - guid ：guid字符串
     *   - normal ：原生对象
     *   - html ：html字符串
     * isSuccessShow ：当操作成功时，是否显示success提示框，默认为false
     */
    ajax: (function () {
        function _ajax(cfg) {
            let _cfg = $.extend(true, {}, {
                url: "",
                dispatch: null,
                actionType: "",
                type: "get",
                dataType: "json",
                result: _ajax.resultEnum.object,
                info: "",
                isShowSuccess: false,
                success: $.noop
            }, cfg);

            _cfg.beforeSend = function () { _beforeSend.apply(this, $.makeArray(arguments).concat(cfg)); }
            _cfg.success = function () { _onSuccess.apply(this, $.makeArray(arguments).concat(cfg)); };
            _cfg.error = function () { _onError.apply(this, $.makeArray(arguments).concat(cfg)); };

            //执行ajax
            $.ajax(_cfg);

        }

        function _beforeSend(xhr, opt, userOpt) {
            tools.showLoading();
            if (typeof userOpt.beforeSend === "function") {
                userOpt.beforeSend.apply(this, $.makeArray(arguments));
            }
        }

        function _onSuccess(resp, state, xhr, userOpt) {
            let isTriggerSuccess = false;
            let opt = this;

            //------------
            resp.code = 10000;
            //---------------

            if (resp.code === 10000) {
                //服务器返回成功
                if (opt.result === _ajax.resultEnum.object && $.isPlainObject(resp.data)) {
                    isTriggerSuccess = true;
                } else if (opt.result === _ajax.resultEnum.array && resp.data instanceof Array) {
                    isTriggerSuccess = true;
                } else if (opt.result === _ajax.resultEnum.array.bool && resp.data === true) {
                    isTriggerSuccess = true;
                } else if (opt.result === _ajax.resultEnum.guid && typeof resp.data === "string") {
                    isTriggerSuccess = true;
                } else if (opt.result === _ajax.resultEnum.html && typeof resp.data === "string") {
                    isTriggerSuccess = true;
                } else {

                    tools.showDialog.error("校验服务器成功返回值异常");
                }
            } else if (resp.code === 10001) {
                //服务器返回失败
                isTriggerSuccess = false;
            } else {
                tools.showDialog.error("response code异常");
            }
            isTriggerSuccess === true ? triggerSuccess.apply(this, $.makeArray(arguments)) : triggerError.apply(this, $.makeArray(arguments));
        }

        function _onError(xhr, state, msg, userOpt) {
            triggerError.call(this, null, state, xhr, userOpt);
            if (typeof userOpt.error === "function") {
                userOpt.error.call(this, xhr, state, msg);
            }
        }


        function triggerSuccess(resp, state, xhr, userOpt) {
            let opt = this;
            tools.hideLoading();
            if (opt.isShowSuccess === true) {
                tools.showDialog.success(opt.info + "成功", function () {
                    triggerUserSuccess.apply(opt, $.makeArray(arguments));
                });
            } else {
                triggerUserSuccess.apply(opt, $.makeArray(arguments));
            }

            function triggerUserSuccess(resp, state, xhr, userOpt) {
                opt.dispatch({
                    type: opt.actionType,
                    data: resp.data
                });
                if (typeof userOpt.success === "function") {
                    userOpt.success.call(opt, resp, state, xhr);
                }
            }
        }

        function triggerError(resp, state, xhr) {
            let opt = this;
            let msg = (resp == null ? "网络请求失败" : resp.msg) || "无";
            tools.showDialog.error(opt.info + "失败，信息：" + msg, function () {
                opt.dispatch({
                    type: ""
                });

            });
        }

        _ajax.resultEnum = {
            object: 0,
            array: 1,
            bool: 2,
            guid: 3,
            html: 4
        }
        return _ajax;
    } ())
})

export default tools;