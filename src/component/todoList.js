import React from "react";
import ReactDOM from "react-dom";
import store from "../store/todoList.js";
import action from "../action/todoList.js";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: store.getState()
        }
    }
    componentDidMount() {
        let unsubscribe = store.subscribe(this.onChange);
    }

    render() {
        let items = this.state.items.map(item => <li>{item.text}</li>);
        return (
            <div>
                <input ref="todo" type="text" />
                <button onClick={this.handleAdd.bind(this)}>添加</button>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }

    onChange() {
        this.setState({
            items: store.getState()
        });
    }
    handleAdd() {
        console.log("this",this);
        let input = ReactDOM.findDOMNode(this.refs.todo);
        let value = input.value.trim();
        console.log("action",action);
        if (value) store.dispatch(action(value));
        input.value = "";
    }
}

ReactDOM.render(<TodoList/>, document.getElementById("app"));