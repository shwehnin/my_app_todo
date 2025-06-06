import React, { useState } from 'react'

const TodoForm = ({addTodo}) => {
    const [title, setTitle] = useState('');
    let addTodoHandler = (e) => {
        e.preventDefault();
        if(title.trim() == '') return;
        let todoData = {
            id: Date.now(),
            title, 
            completed: false,
        }
        addTodo(todoData);
        setTitle('');
    }
    return (
        <form onSubmit={addTodoHandler}>
            <input
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
        </form>
    )
}

export default TodoForm