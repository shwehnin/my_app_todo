import React from 'react'
import Todo from './Todo'
import Spinner from '../spinner/Spinner'

const TodoList = ({ isLoading, todos, deleteTodo, updateTodo }) => {
    return (
        <>
            {isLoading && <Spinner/>}
            {!isLoading && todos.length > 0 ? (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            updateTodo={updateTodo}
                        />
                    ))}
                </ul>
            ) : (
                !isLoading && <p>No Data</p>
            )}
        </>
    )
}

export default TodoList