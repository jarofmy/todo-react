import React from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.renderTodos = this.renderTodos.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    renderTodos() {
        const todos = this.state.todos.map(todo => {
            return (
            <CSSTransition key={todo.id} timeout={500} classNames='todo'>
                <Todo 
                    key={todo.id} 
                    id={todo.id}
                    task={todo.task} 
                    completed={todo.completed}
                    removeTodo={this.removeTodo}
                    updateTodo={this.updateTodo}
                    toggleTodo={this.toggleCompletion}
                />
            </CSSTransition>
            );
        });
        return todos;
    }

    createTodo(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }

    updateTodo(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, task: updatedTask};
            }
            return todo;
        });
        this.setState({ todos: updatedTodos });
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }

    render() {
        return(
            <div className="TodoList">
                <h1>
                    To Do List! <span>A Simple React To-Do List App.</span>
                </h1>
                <NewTodoForm createTodo={this.createTodo} />
                <ul>
                    <TransitionGroup className='todo-list'>{this.renderTodos()}</TransitionGroup>
                </ul>
            </div>
        )
    }
}

export default TodoList;