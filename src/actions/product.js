import {GET_PRODUCT_LIST} from "../constants/actionType.js"
import tools from "../utils/tools.js"

export function getProductList() {
    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/department/list",
            //todo
            // data:{
                
            // },
            result:tools.ajax.resultEnum.normal,
            dispatch: dispatch,
            actionType: GET_PRODUCT_LIST
        })
    }
}