import Immutable from "immutable";
import {GET_MENU, GET_LOGIN_USER} from "../constants/actionType.js"



let initState = Immutable.Map({
    $$menus: Immutable.List(),
    $$user: Immutable.Map()
});

export default function layout(state = initState, action) {
    switch (action.type) {
        case GET_MENU:
            return _getMenu(state, Immutable.fromJS(action.menus));
		case GET_LOGIN_USER:
            return _getLoginUser();
        default:
            return state;
    }
}


function _getMenu(state, value) {
    return state.set("$$menus", value);
}

function _getLoginUser() {

}