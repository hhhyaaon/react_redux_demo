import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"
import tools from "../utils/tools.js"


export function getMenu() {

    return (dispatch) => {
        tools.ajax({
            url: "http://emkt.sfaessentials.com/aj/product/list",
            actionType: GET_MENU,
            dispatch: dispatch,
            result:tools.ajax.resultEnum.normal
        });
    }
}






