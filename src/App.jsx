import "./App.css";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
    const [todos, setTodos] = useState([
        { text: "initial todo", id: nanoid(), checkness: true },
    ]);
    const [currentTodo, setCurrentTodo] = useState({ text: "", id: null });
    const [editMode, setEditMode] = useState(false);
    const increaseTodos = () => {
        if (currentTodo.text.trim() === "") return;
        setTodos([
            ...todos,
            { text: currentTodo.text.trim(), id: nanoid(), checkness: false },
        ]);
        setCurrentTodo({ text: "", id: null });
    };
    const deleteOneTodo = (id) => {
        let indexToDelete = todos.findIndex((el) => el.id === id);
        setTodos([
            ...todos.slice(0, indexToDelete),
            ...todos.slice(indexToDelete + 1, todos.length),
        ]);
    };

    const changeTodoText = (id) => {
        setEditMode(true);
        let indexToEdit = todos.findIndex((el) => el.id === id);
        let { text: todotext } = todos[indexToEdit];
        setCurrentTodo({ text: todotext, id: id });
    };
    const updateText = () => {
        if (currentTodo.text.trim() === "") {
            deleteOneTodo(currentTodo.id);
            return;
        }
        let indexToEdit = todos.findIndex((el) => el.id === currentTodo.id);
        let { checkness } = todos[indexToEdit];
        todos[indexToEdit] = {
            text: currentTodo.text,
            id: currentTodo.id,
            checkness: checkness,
        };
        setEditMode(false);
        setTodos([...todos]);
    };

    const changeCheckness = (id) => {
        let indexToEdit = todos.findIndex((el) => el.id === id);
        let { text, checkness } = todos[indexToEdit];
        todos[indexToEdit] = { text: text, id: id, checkness: !checkness };
        setTodos([...todos]);
    };
    const handleTodoChange = (e) => {
        const { name, value } = e.target;
        setCurrentTodo({ [name]: value, id: currentTodo.id });
    };
    return (
        <div className="main">
            <div className=" gap-4 pt-10 px-10 w-96 sm:w-[45rem] h-96 grid bg-white">
                <label className="text-gray-300 font-bold text-8xl">
                    todos
                </label>
                <button className="rounded-full flex w-full gap-2 bg-white border shadow-slate-500 shadow-md h-14 px-8 py-2 items-center">
                    <input
                        type="text"
                        className="flex-grow px-2 outline-none h-full"
                        placeholder="Add todo..."
                        value={currentTodo.text}
                        name="text"
                        onChange={(e) => {
                            handleTodoChange(e);
                        }}
                    />

                    <span
                        onClick={() =>
                            editMode ? updateText() : increaseTodos()
                        }
                        className="text-white bg-blue-600 font-extrabold text-3xl rounded-full w-8 h-8 grid place-content-center pb-2"
                    >
                        +
                    </span>
                </button>
                <div className="grid gap-2 h-full overflow-y-auto">
                    {todos.map((todo, index) => {
                        return (
                            <Todo
                                text={todo.text}
                                id={todo.id}
                                key={index}
                                isChecked={todo.checkness}
                                deleteOneTodo={deleteOneTodo}
                                changeCheckness={changeCheckness}
                                changeTodoText={changeTodoText}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
