import './App.css';
import TodoForm from './components/todo/TodoForm';
import TodoList from './components/todo/TodoList';
import CheckAllAndRemaining from './components/todo/CheckAllAndRemaining';
import TodoFilter from './components/todo/TodoFilter';
import ClearCompletedBtn from './components/todo/ClearCompletedBtn';
import { useCallback, useEffect, useState } from 'react';

const url = process.env.REACT_APP_BASE_URL;
function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoFilter, setTodoFilter] = useState(todos);

  // get todos
  useEffect(() => {
    setIsLoading(true);
    fetch(`${url}/todos`).then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }).then(data => {
      console.log(data);
      setTodos(data);
      setTodoFilter(data);
      setIsLoading(false);
    }).catch(e => {
      console.log(e);
    });
  }, []);

  // get todos filter by status
  let filterByStatus = useCallback((filter) => {
    if(filter == 'All') {
      setTodoFilter(todos);
    }
    if(filter == 'Active') {
      setTodoFilter(todos.filter(todo => !todo.completed));
    }
    if(filter == 'Completed') {
      setTodoFilter(todos.filter(todo => todo.completed));
    }
  }, [todos]);

  // add todo
  let addTodo = (todo) => {
    fetch(`${url}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setTodos(prevState => [...prevState, todo]);
  }

  // delete todo
  let deleteTodo = (todoId) => {
    fetch(`${url}/todos/${todoId}`, {
      method: "DELETE"
    });

    setTodos(prevState => prevState.filter(todo => todo.id != todoId));
  }

  // update todo
  let updateTodo = (todo) => {
    fetch(`${url}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    });

    setTodos(prevState => prevState.map(item => {
      if (item.id == todo.id) {
        return todo;
      }
      return item;
    }));
  }

  // check remaining count
  let checkRemainingCount = todos.filter(todo => !todo.completed).length;

  // check all todo
  let checkAllTodo = () => {
    todos.forEach((todo => {
      todo.completed = true;
      updateTodo(todo);
    }));

    setTodos(prevState => prevState.map(todo => {
      return {
        ...todo, completed : true
      }
    }))
  }

  // clear all completed todos
  let clearCompletedTodo = () => {
    todos.forEach(todo => {
      if(todo.completed) {
        deleteTodo(todo.id);
      }
    });

    setTodos(prevState => prevState.filter(todo => !todo.completed));
  }
  
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList isLoading={isLoading} todos={todoFilter} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaining checkRemainingCount={checkRemainingCount} checkAllTodo={checkAllTodo} />
        <div className="other-buttons-container">
          <TodoFilter filterByStatus={filterByStatus} />
          <ClearCompletedBtn clearCompletedTodo={clearCompletedTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
