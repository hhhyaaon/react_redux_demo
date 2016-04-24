export const ADD_COUNTER="ADD_COUNTER";
export const REDUCE_COUNTER="REDUCE_COUNTER";

//导出add方法
export function add(){
    return {
        type:ADD_COUNTER
    }
}

//导出reduce方法
export function reduce(){
    return {
        type:REDUCE_COUNTER
    }
}

//导出奇数时加一方法
export function addIfOdd(){
    return (dispatch,getState)=>{
        //获取state对象中的counter属性值
        const {counter} = getState();
        
        //偶数则返回
        if(counter%2===0)return;
        
        //否则加一
        dispatch(add());
    }
}

//导出异步加一方法
export function addAsync(delay=1000){
    return dispatch=>{
        let time = setTimeout(()=>{
            dispatch(add());
            clearTimeout(time);
        },delay);
    }
}