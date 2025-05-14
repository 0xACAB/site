import { action, makeAutoObservable } from 'mobx';

class Todo {
    todos = [
        //{ id: 1, title: { id: 1, name: 'test' }, completed: false },
        { id: 2, title: 'Посмотри ULBI TV', completed: false },
        { id: 3, title: 'Поставь лайк', completed: false }
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        console.log('remove');
    }

    completeTodo(id) {
        this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        console.log('complete');
    }

    fetchTodo() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then(
                action('fetch', (json) => {
                    this.todos = [...this.todos, ...json];
                })
            );
    }
}

export default new Todo();
