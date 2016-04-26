import {GET_MENU,GET_LOGIN_USER} from "../constants/actionType.js"

export function click(text){
    console.log("action",this,arguments);
    return {
        type:GET_MENU,
        text:text
    }
}