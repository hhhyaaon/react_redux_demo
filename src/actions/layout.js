import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"
import {tools} from "../utils"


export function getMenu() {

    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/product/list",
            info: "获取菜单",
            actionType: GET_MENU,
            dispatch: dispatch
        });
    }
}






