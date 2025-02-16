import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem("todos");
    return localTodos ? JSON.parse(localTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.trim() === "") return; 
    setTodos([...todos, { id: uuidv4(), text: todo, isCompleted: false }]);
    setTodo("");
  };

  const handleDelete = (e) => {
    const id = e.currentTarget.dataset.id;
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (e) => {
    const id = e.currentTarget.dataset.id;
    const selectedTodo = todos.find((todo) => todo.id === id);
    setTodo(selectedTodo.text);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCheckbox = (e) => {
    const id = e.currentTarget.dataset.id;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-pink-100 to-orange-200 h-screen flex items-center justify-center relative">
        <div className="flex flex-col gap-1 h-[37rem] bg-white p-6 rounded-2xl shadow-xl shadow-[rgba(179,111,86,0.4)] font-bold text-gray-800 m-4 w-full sm:w-4/5 lg:w-2/4">
          <h1 className="text-center text-2xl">Todo App</h1>
          <div className="flex flex-row justify-between">
            <input
              className="mt-4 h-14 p-2 text-[1rem] w-full border-2 border-amber-800 focus:border-amber-700 focus:ring-amber-700 rounded-lg outline-none"
              type="text"
              placeholder="Add your new task"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo(); 
                }
              }}
            />
            <img
              src={
                todo.trim()
                  ? "./src/assets/plus.svg"
                  : "./src/assets/plus(disable).svg"
              }
              alt="plus"
              className={`w-14 h-14 mt-4 ml-2 cursor-pointer transition-opacity duration-300 ease-in-out ${
                todo.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={addTodo}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
            {todos.length === 0 && (
              <p className="text-center text-lg text-[rgb(175,133,93)] py-4 rounded-lg w-full">
                No tasks to show
              </p>
            )}
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-row justify-between gap-2 items-center p-2 bg-gray-200 rounded-lg"
              >
                <input
                  className="w-6 h-6 cursor-pointer outline-none rounded-lg"
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={handleCheckbox}
                  data-id={todo.id}
                />
                <p
                  className={`w-4/5 break-words min-w-0 ${
                    todo.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </p>
                <div className="flex flex-row gap-2 flex-shrink-0 min-w-fit">
                  <img
                    src="./src/assets/delete.svg"
                    alt="delete"
                    className="w-10 h-10 cursor-pointer"
                    data-id={todo.id}
                    onClick={handleDelete}
                  />
                  <img
                    src="./src/assets/edit.svg"
                    alt="edit"
                    className="w-10 h-10 cursor-pointer"
                    data-id={todo.id}
                    data-text={todo.text}
                    onClick={handleEdit}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
