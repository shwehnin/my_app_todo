import React from 'react'

const ClearCompletedBtn = ({clearCompletedTodo}) => {
    return (
        <div>
            <button className="button" onClick={clearCompletedTodo}>Clear completed</button>
        </div>
    )
}

export default ClearCompletedBtn