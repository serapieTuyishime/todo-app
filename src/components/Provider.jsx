import { nanoid } from "nanoid";
import React, { useState, createContext } from "react";

export const Context = createContext(null);

const Provider = (props) => {
    const loadLocalStorage = () => {
        return window.localStorage.getItem("todos")
            ? [...JSON.parse(window.localStorage.getItem("todos"))]
            : [{ text: "initial todo", id: null, checkness: false }];
    };
    const updateLocalStorage = () => {
        window.localStorage.setItem("todos", JSON.stringify(todos));
    };
    const [todos, setTodos] = useState(() => loadLocalStorage());

    const [currentTodo, setCurrentTodo] = useState({
        text: "",
        id: null,
        checkness: false,
    });
    const increaseTodos = (todo) => {
        if (!todo) return;
        if (todo.text.trim() === "") return;
        setTodos([
            ...todos,
            { text: todo.text.trim(), id: nanoid(), checkness: false },
        ]);
        setCurrentTodo({ text: "", id: null });
        updateLocalStorage();
    };
    const findTodoByID = (id) => todos.findIndex((todo) => todo.id === id);

    const changeCheckness = (id) => {
        let indexToEdit = findTodoByID(id);
        let { text, checkness } = todos[indexToEdit];
        todos[indexToEdit] = { text: text, id: id, checkness: !checkness };
        setTodos([...todos]);
        updateLocalStorage();
    };
    const deleteOneTodo = (id) => {
        let indexToDelete = todos.findIndex((el) => el.id === id);
        setTodos([
            ...todos.slice(0, indexToDelete),
            ...todos.slice(indexToDelete + 1, todos.length),
        ]);
        updateLocalStorage();
    };

    const updateTodoText = (todo) => {
        if (todo.text.trim() === "") {
            deleteOneTodo(todo.id);
            setCurrentTodo({
                text: "",
                id: null,
                checkness: false,
            });
            return;
        } else {
            let indexToEdit = findTodoByID(todo.id);
            let { checkness } = todos[indexToEdit];
            todos[indexToEdit] = {
                text: todo.text,
                id: todo.id,
                checkness: checkness,
            };
            setTodos([...todos]);
            setCurrentTodo({ text: "", id: null, checkness: false });
        }
        updateLocalStorage();
    };
    const selectOneTodo = (id) => {
        let selectedTodo = todos[findTodoByID(id)];
        const { text, checkness } = selectedTodo;
        setCurrentTodo({ text, id, checkness });
    };
    return (
        <Context.Provider
            value={{
                temporaryTodo: currentTodo,
                increaseTodos,
                todos,
                changeCheckness,
                deleteOneTodo,
                selectOneTodo,
                updateTodoText,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Provider;
