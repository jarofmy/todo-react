import React from 'react'
import './Todo.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false, 
            task: this.props.task
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.renderLogic = this.renderLogic.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRemove() {
        this.props.removeTodo(this.props.id);
    }

    handleUpdate(event) {
        event.preventDefault();
        // take new task data and pass up to parent
        this.props.updateTodo(this.props.id, this.state.task);
        this.setState({ isEditing: false });
    }

    handleToggle(event) {
        this.props.toggleTodo(this.props.id);
    }

    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    renderLogic() {
        let result;
        if(this.state.isEditing) {
            result = (
                <CSSTransition key='editing' timeout={500} classNames='form'>
                    <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
                        <input 
                            type='text'
                            name='task'
                            value={this.state.task}
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form>
                </CSSTransition>
            );
        } else {
            result = (
                <CSSTransition key='normal' timeout={500} classNames='task-text'>
                    <li className='Todo-task' onClick={this.handleToggle}>
                        {this.props.task}
                    </li>
                </CSSTransition>
            );
        }
        return (
            <TransitionGroup
                className={this.props.completed ? "Todo completed" : "Todo"}
            >
            {result}
            <div className='Todo-buttons'>
                <button onClick={this.toggleEdit}>
                    <i className="fa fa-edit"></i>
                </button>
                <button onClick={this.handleRemove}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </TransitionGroup>
        );
    }

    render() {
        return (
            <div className="Todo">
                {this.renderLogic()}
            </div>
        )
    }
}

export default Todo;