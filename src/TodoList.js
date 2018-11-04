import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const API_URL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }

        this.addTodo = this.addTodo.bind(this);
    }

    componentWillMount() {
        this.loadTodos();
    }

    loadTodos() {
        fetch(API_URL).then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(data => {
                        let err = {errMessage: data.message}
                        throw err;
                    });
                } else {
                    let err = {errMessage: 'Server is not responding.'}
                    throw err;
                }
            } return res.json();
        }).then(todos => this.setState({todos}));
    }

    addTodo(value) {
        fetch(API_URL, {
            method: 'post',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({name: value})
        }).then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(data => {
                        let err = {errMessage: data.message}
                        throw err;
                    });
                } else {
                    let err = {errMessage: 'Server is not responding.'}
                    throw err;
                }
            } return res.json();
        }).then(newTodo => {
            this.setState({todos: [...this.state.todos, newTodo]});
        })
    }

    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem key={t._id}
                {...t}
            />
        ));

        return (
            <div>
                <h1>todolist</h1>

                <TodoForm addTodo={this.addTodo} />

                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default TodoList;
