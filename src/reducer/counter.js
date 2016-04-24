import {ADD_COUNTER,REDUCE_COUNTER} from "../action/counter.js";

export default function counter(state=0,action){
    switch (action.type){
        case ADD_COUNTER:return state+1;
        case REDUCE_COUNTER:return state-1;
        default:state
    }
}