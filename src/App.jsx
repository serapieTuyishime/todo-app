import "./App.css";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import InputArea from "./components/InputArea";
import DisplayArea from "./components/DisplayArea";
import { Provider } from "react-redux";

function App() {
    const loadLocalStorage = () => {
        return window.localStorage.getItem("todos")
            ? [...JSON.parse(window.localStorage.getItem("todos"))]
            : [{ text: "initial todo", id: null, checkness: false }];
    };
    const [todos, setTodos] = useState(loadLocalStorage);
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
        let indexToEdit = findTodoByID(id);
        let { text: todotext } = todos[indexToEdit];
        setCurrentTodo(updateCurrentTodo(todotext, id));
    };
    const updateTodoText = () => {
        if (currentTodo.text.trim() === "") {
            deleteOneTodo(currentTodo.id);
            return;
        }
        let indexToEdit = findTodoByID(currentTodo.id);
        let { checkness } = todos[indexToEdit];
        todos[indexToEdit] = updateCurrentTodo(
            currentTodo.text,
            currentTodo.id,
            checkness
        );
        setEditMode(false);
        setCurrentTodo(updateCurrentTodo("", null));
        setTodos([...todos]);
    };
    const updateCurrentTodo = (text = "", id = null, checkness = false) => {
        return checkness === undefined ? { text, id } : { text, id, checkness };
    };
    const findTodoByID = (id) => todos.findIndex((todo) => todo.id === id);

    const changeCheckness = (id) => {
        let indexToEdit = findTodoByID(id);
        let { text, checkness } = todos[indexToEdit];
        todos[indexToEdit] = updateCurrentTodo(text, id, !checkness);
        setTodos([...todos]);
    };

    return (
        <div className="main">
            <div className="gap-4 md:gap-8 p-5 md:p-10 overflow-y-hidden h-[80%] my-auto w-full sm:w-9/12 grid bg-gray-100 rounded-3xl content-start">
                <label className="font-bold text-gray-300 text-8xl">
                    todos
                </label>
                <InputArea />
                <DisplayArea />
            </div>
        </div>
    );
}

export default App;
