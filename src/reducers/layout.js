import Immutable from "immutable";
import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"



let initState = Immutable.Map({
    menus: Immutable.List(),
    user: Immutable.Map()
});



const menus = Immutable.Map({
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
});


export default function layout(state = initState, action) {
    switch (action.type) {
        case GET_MENU:
            return _getMenu(state, Immutable.fromJS(action.data));
        case GET_LOGIN_USER:
            return _getLoginUser();
        default:
            return state;
    }
}


function _getMenu(state, value) {
    //------------删除
    value = menus.get("data");
    //------------
    return state.set("menus", value);
}

function _getLoginUser() {

}