const ADD_TODO = "ADD_TODO";

//定义actionCreator
export default function add(data) {
    return {
        type: ADD_TODO,
        text: data
    }
}