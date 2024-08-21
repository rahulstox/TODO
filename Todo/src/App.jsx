import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import { TodoForm } from "./Components";
import {TodoItem} from "./Components";

function App() {
  const [Todos, setTodos] = useState([]);

  const addTodo = (Todo) => {
    setTodos((prev) => [{ id: Date.now(), ...Todo }, ...prev]);
  };

  const updatedTodo = (id, Todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        (prevTodo.id === id ? Todo : prevTodo)))
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((Todo) => Todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
    ? { ...prevTodo, completed: !prevTodo.completed }
    : prevTodo))
  };


  // Here we use the local storage And we can use multiple useEffect 
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }, [Todos])


  return (
    <TodoProvider
      value={{ Todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {Todos.map((Todo) => (
              <div key={Todo.id} className='w-full'>
                <TodoItem Todo={Todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
