import {ADD_TODO} from "../action/todoList.js"

//处理action中事件
export default function todoReducer(state, action) {
    // if (state == null) {
    //     return [];
    // }
    debugger;
    switch (action.type) {
        case "ADD_TODO":
            return state.slice().concat({
                text: action.text,
                completed: false
            });
        default:
            return state;
    }

}
