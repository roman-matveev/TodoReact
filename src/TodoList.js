import React, { Component } from 'react';

const API_URL = '/api/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
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

    render() {
        return (
            <h1>Hey</h1>
        );
    }
}

export default TodoList;
