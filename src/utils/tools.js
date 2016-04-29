import React from "react"
import ReactDOM from "react-dom"
import Spin from "antd/lib/spin"
import Modal from "antd/lib/modal"
import $ from "jquery"


const utils = {
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

$.extend(true, utils, {
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
        let _cfg = {};
        let _this = utils;
        function mpAjax(cfg) {
            _cfg = $.extend(true, {
                url: "",
                dispatch: null,
                actionType:"",
                type: "get",
                dataType: "json",
                result: mpAjax.resultEnum.array,
                info: "",
                isShowSuccess: false
            }, cfg);
            //注册请求前事件
            _cfg.beforeSend = function () {
                _this.showLoading();
                if (typeof cfg.beforeSend === "function") {
                    cfg.beforeSend.apply(this, Array.prototype.slice.call(arguments));
                }
            }

            //注册请求失败事件
            _cfg.error = function (xhr, e) {
                _this.hideLoading(); // todo
                _triggerError(xhr.statusText);
                if (typeof cfg.error === "function") {
                    cfg.error.apply(this, Array.prototype.slice.call(arguments));
                }
            }

            //注册响应成功事件
            _cfg.success = function (res) {
                //-----------删除
                res.code = 10000;
                //------------
                
                var isTriggerSuccess = false;
                _this.hideLoading();
                if (res.code === 10000) {
                    //成功
                    if (_cfg.result === mpAjax.resultEnum.array) {
                        isTriggerSuccess = res.data instanceof Array;
                    } else if (_cfg.result === mpAjax.resultEnum.bool) {
                        isTriggerSuccess = res.data === true;
                    } else if (_cfg.result === mpAjax.resultEnum.guid) {
                        isTriggerSuccess = typeof res.data === "string";
                    } else if (_cfg.result === mpAjax.resultEnum.normal) {
                        
                        isTriggerSuccess = $.isPlainObject(res.data) === true;
                    } else {
                        isTriggerSuccess = false;
                    }
                } else {
                    //失败
                    isTriggerSuccess = false;
                }
                isTriggerSuccess ? _triggerSuccess.call(this, res) : _triggerError(res.msg);
            }

            function _triggerError(mes) {
               
                
                _this.showDialog.error(_cfg.info + "操作失败，信息：" + (mes || "无"));
                _cfg.dispatch({
                    type: ""
                });
                _cfg.dispatch = null;
            }

            function _triggerSuccess(res) {
                 console.log(_cfg);
                if (_cfg.isShowSuccess === true) {
                    _this.showDialog.success(_cfg.info + "操作成功", function () {
                        _cfg.dispatch({
                            type: _cfg.actionType,
                            data: res.data
                        })
                    });
                } else {
                    _cfg.dispatch({
                        type: _cfg.actionType,
                        data: res.data
                    })
                }
            }
            return $.ajax(_cfg);
        }
        mpAjax.resultEnum = {
            normal: 0,
            array: 1,
            bool: 2,
            guid: 3,
            html: 4
        }
        return mpAjax;
    } ())
})

export default utils;