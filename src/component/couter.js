import React from "react";

class Counter extends React.Component {
    render() {
        //向组件的属性中导入四个方法和一个变量
        //1、增加
        //2、奇数时增加
        //3、异步增加
        //4、减少
        //5、数量
        const {add, addIfOdd, addAsync, reduce, counter} = this.props;
        return (
            <p>
                点击次数：{counter} 次
                <button onClick={add}>+</button>
                <button onClick={reduce}>-</button>
                <button onClick={addIfOdd}>奇数时加</button>
                <button onClick={addAsync}>异步加</button>
            </p>
        )
    }
}

export default Counter;