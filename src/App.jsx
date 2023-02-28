import "./App.css";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
    const [todos, setTodos] = useState(() => {
        return (
            [...JSON.parse(window.localStorage.getItem("todos"))] || [
                { text: "initial todo", id: null, checkness: false },
            ]
        );
    });
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
    useEffect(() => {
        updateLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos]);

    const updateLocalStorage = () => {
        window.localStorage.setItem("todos", JSON.stringify(todos));
    };

    const todoTextUpdator = (id) => {
        setEditMode(true);
        let indexToEdit = todos.findIndex((el) => el.id === id);
        let { text: todotext } = todos[indexToEdit];
        setCurrentTodo({ text: todotext, id: id });
    };
    const updateTodoText = () => {
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
        setCurrentTodo({ text: "", id: null });
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
            <div className="gap-4 md:gap-8 p-5 md:p-10 overflow-y-hidden h-[80%] my-auto w-full sm:w-9/12 grid bg-gray-100 rounded-3xl content-start">
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
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                editMode ? updateTodoText() : increaseTodos();
                            }
                        }}
                    />

                    <span
                        onClick={() =>
                            editMode ? updateTodoText() : increaseTodos()
                        }
                        className="text-white bg-blue-600 font-extrabold text-3xl rounded-full w-8 h-8 grid place-content-center pb-2"
                    >
                        +
                    </span>
                </button>
                <div className="grid gap-2 overflow-y-auto">
                    {todos.map((todo, index) => {
                        return (
                            <Todo
                                text={todo.text}
                                id={todo.id}
                                key={index}
                                isChecked={todo.checkness}
                                deleteOneTodo={deleteOneTodo}
                                changeCheckness={changeCheckness}
                                todoTextUpdator={todoTextUpdator}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
