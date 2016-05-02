import {
    GET_PRODUCT_LIST,
    GET_CHECKED_PRODUCTS,
    DELETE_PRODUCTS} from "../constants/actionType.js"
import {tools} from "../utils"
import $ from "jquery"

let defConditions = {
    keyword: "",
    page_index: 1,
    page_size: tools.listPageSize,
    order: "",
    order_type: ""
}


export function getProductList(conditions) {
    console.warn("conditions", $.extend(true, {}, defConditions, conditions));
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info: "获取产品列表",
            data: $.extend(true, {}, defConditions, conditions),
            dispatch: dispatch,
            actionType: GET_PRODUCT_LIST
        })
    }
}

export function getCheckedPdts(checkedPdts) {
    return {
        type: GET_CHECKED_PRODUCTS,
        data: checkedPdts
    }
}

export function deletePdts(checkedPdts) {
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info: "刪除产品列表",
            data: {
                checkedPdts: checkedPdts
            },
            //result:tools.ajax.resultEnum.bool,
            dispatch: dispatch,
            actionType: DELETE_PRODUCTS,
            success() {
                //重新获取产品列表
                getProductList();
            }
        })
    }
}

export function deletePdts(checkedPdts) {
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info: "刪除产品列表",
            data: {
                checkedPdts: checkedPdts
            },
            //result:tools.ajax.resultEnum.bool,
            dispatch: dispatch,
            actionType: DELETE_PRODUCTS,
            success() {
                //重新获取产品列表
                getProductList();
            }
        })
    }
}

export function changePdtsState(checkedPdts, dstState) {
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info: "变更产品状态",
            data: {
                checkedPdts: checkedPdts,
                state: dstState
            },
            //result:tools.ajax.resultEnum.bool,
            dispatch: dispatch,
            actionType: DELETE_PRODUCTS,
            success() {
                //重新获取产品列表
                getProductList();
            }
        })
    }
}

