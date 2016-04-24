// import {bindActionCreators} from "reducx";
// import {connect} from "react-redux";
// import Counter from "../component/counter.js"
// import * as CounterActions from "../action/counter";

// //state:数据
// //action:动作
// //action根据reducer更新state

// //将state.counter绑定到props.counter
// function mapStateToProps(state){
//     return {
//         counter:state.counter
//     }
// }

// //将action的所有方法绑定到props上
// function mapDispatchToProps(dispatch){
//     return bindActionCreators(CounterActions,dispatch);
// }

// //连接React组件与Redux store，返回一个新的与Redux store 连接的组件类
// //mapStateToProps[function]：用于监听Redux store变化，只要Redux store变化，mapStateToProps会被调用。该函数必须返回一个纯对象，这个对象会与组件的props合并
// //mapDispatchToProps[object|function]：
// //Object:定义在对象中的每一个函数都会被当做Redux action creator，且这个对象会与Redux store绑定在一起，所有定义的方法名将作为属性名，合并到props中
// //Function:该函数接收一个dispatch函数，并返回一个对象，这个对象通过dispatch函数与action creator以某种方式绑定到一起
// export default connect(mapStateToProps,mapDispatchToProps)(Counter);