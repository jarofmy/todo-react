import React from 'react'
import uuid from 'uuid/v4';
import "./NewTodoForm.css";

class NewTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { task: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.createTodo({ ...this.state, id: uuid(), completed: false });
        this.setState({ task: "" });
    }
    render() {
        return (
            <form className='NewTodoForm' onSubmit={this.handleSubmit}>
                <label htmlFor='task'>New Todo</label>
                <input 
                    type='text'
                    placeholder='New Todo'
                    id='task'
                    name='task'
                    value={this.state.task}
                    onChange={this.handleChange}
                />
                <button>Add Todo</button>
            </form>
        )
    }
}

export default NewTodoForm;