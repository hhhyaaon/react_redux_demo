import Immutable from "immutable";
import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"

let initState = Immutable.fromJS({});

export default function layout(state = initState, action) {
    console.log("action.type",action.type);
    switch (action.type) {
        case GET_MENU:
            return _getMenu(state, action.text);
        case GET_LOGIN_USER:
            return _getLoginUser();
        default:
            return state;
    }
}


function _getMenu(menus) {
    console.log("reducer",this,arguments);
    state.menus = menus;
    return state;
}

function _getLoginUser() {

}