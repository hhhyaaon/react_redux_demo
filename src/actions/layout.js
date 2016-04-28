import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"
import components from "../utils/components.js"

console.warn(components);

export function getMenu() {
    return (dispatch) => {
        components.showLoading();
        return fetch("http://emkt.sfaessentials.com/aj/product/list")
            .then(resp => resp.json())
            .then(data => dispatch(_done(data)))
            .catch(error => dispatch(_fail(error)))
    }

    function _done(data) {
        //成功
        data = {
            code: 10000,
            data: [
                {
                    id: "1",
                    name: "概况",
                    sub: []
                },
                {
                    id: "2",
                    name: "管理",
                    sub: [
                        {
                            id: "2-1",
                            name: "产品管理",
                            url: "/user/list",
                            sub: []
                        }, {
                            id: "2-2",
                            name: "信息点管理",
                            sub: []
                        }, {
                            id: "2-3",
                            name: "内容管理",
                            sub: []
                        }
                    ]
                },
                {
                    id: "3",
                    name: "精准化营销",
                    sub: [
                        {
                            id: "3-1",
                            name: "营销管理",
                            sub: []
                        }, {
                            id: "3-2",
                            name: "统计分析",
                            sub: []
                        }
                    ]
                },
                {
                    id: "4",
                    name: "高效推广",
                    sub: [
                        {
                            id: "4-1",
                            name: "推广管理",
                            sub: []
                        }, {
                            id: "4-2",
                            name: "统计分析",
                            sub: []
                        }
                    ]
                },
                {
                    id: "5",
                    name: "设置",
                    sub: [
                        {
                            id: "5-1",
                            name: "权限设置",
                            sub: []
                        }, {
                            id: "5-2",
                            name: "账户充值",
                            sub: []
                        }
                    ]
                }
            ]
        };

        // //失败
        // data = {
        //     code: 10001,
        //     msg: "出错了，就不给你数据呵呵哒"
        // }
        components.hideLoading();
        if (data.code === 10000) {
            //成功

            return {
                type: GET_MENU,
                menus: data.data
            }
        } else {
            //失败
            components.showDialog.error(data.msg);
            return {
                type: "",
                menus: []
            }
        }
    }

    function _fail(error) {
        components.showDialog.error(error.message);
        return {
            type: GET_MENU,
            menus: []
        }
    }
}

