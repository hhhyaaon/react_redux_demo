import {GET_PRODUCT_LIST} from "../constants/actionType.js"
import {tools} from "../utils"

export function getProductList() {
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            info:"获取产品列表",
            //todo
            // data:{
                
            // },
            dispatch: dispatch,
            actionType: GET_PRODUCT_LIST
        })
    }
}