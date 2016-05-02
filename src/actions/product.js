import {
    GET_PRODUCT_LIST,
    GET_CHECKED_PRODUCTS,
    DELETE_PRODUCTS,
    SET_PRODUCT
} from "../constants/actionType.js"
import {tools} from "../utils"
import $ from "jquery"

/**
 * 获取产品列表
 * 
 * @export
 * @param conditions 查询条件
 * @returns (description)
 */
export function getProductList(conditions) {
    let defConditions = {
        keyword: "",
        page_index: 1,
        page_size: tools.listPageSize,
        order: "",
        order_type: ""
    }
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

/**
 * 获取选中的产品
 * 
 * @export
 * @param checkedPdts 选中产品key的集合
 * @returns (description)
 */
export function getCheckedPdts(checkedPdts) {
    return {
        type: GET_CHECKED_PRODUCTS,
        data: checkedPdts
    }
}

/**
 * 批量删除产品
 * 
 * @export
 * @param checkedPdts 待删除的产品key的集合
 * @returns (description)
 */
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


/**
 * 批量变更产品状态
 * 
 * @export
 * @param checkedPdts 待变更的产品key的集合
 * @param dstState 变更后的状态
 * @returns (description)
 */
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

/**
 * 设置待保存的产品信息
 * 
 * @export
 * @param fields 变更的产品属性
 * @returns (description)
 */
export function setPdt(fields) {
    return {
        type: SET_PRODUCT,
        data: fields
    }
}

/**
 * 保存产品
 * 
 * @export
 * @param pdt 待保存的产品信息
 * @returns (description)
 */
export function savePdt(pdt) {
    let fields = {};
    $.each(pdt,(key,val)=>{
        fields[key] = val.value
    });
    console.log("fields",fields);
    
    return (dispatch) => {
        tools.ajax({
            //type:"post",
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info: "保存产品",
            data: {
                checkedPdts: checkedPdts,
                state: dstState
            },
            //result:tools.ajax.resultEnum.bool,
            dispatch: dispatch,
            actionType: DELETE_PRODUCTS,
            success() {

            }
        })
    }
}

