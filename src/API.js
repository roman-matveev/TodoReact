const API_URL = '/api/todos/';

export async function fetchTodos() {
    return fetch(API_URL)
    .then(checkStatus)
}

export async function createTodo(value) {
    return fetch(API_URL, {
        method: 'post',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({name: value})
    }).then(checkStatus)
}

export async function removeTodo(id) {
    const deleteURL = API_URL + id;

    return fetch(deleteURL, {
        method: 'delete'
    }).then(checkStatus)
}

export async function updateTodo(todo) {
    const updateURL = API_URL + todo._id;

    return fetch(updateURL, {
        method: 'put',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({completed: !todo.completed})
    }).then(checkStatus)
}

const checkStatus = res => {
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
}
