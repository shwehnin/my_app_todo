import React from 'react'

const CheckAllAndRemaining = ({checkRemainingCount, checkAllTodo}) => {
    
    return (
        <div className="check-all-container">
            <div>
                <div className="button" onClick={checkAllTodo}>Check All</div>
            </div>

            <span>{checkRemainingCount} {checkRemainingCount > 1 ? 'items' : 'item'} remaining</span>
        </div>
    )
}

export default CheckAllAndRemaining