import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../features/todo";
import { nanoid } from "nanoid";

function InputArea() {
    const loadLocalStorage = () => {
        return window.localStorage.getItem("todos")
            ? [...JSON.parse(window.localStorage.getItem("todos"))]
            : [{ text: "initial todo", id: null, checkness: false }];
    };
    const todo = useSelector((state) => state.todo.value);

    const [currentTodo, setCurrentTodo] = useState({
        text: todo.text,
        id: null,
    });

    const dispatch = useDispatch();

    const handleTodoChange = (e) => {
        const { value } = e.target;
        setCurrentTodo({ text: value, id: null });
    };

    const updateTodoText = () => {
        dispatch(add({ text: currentTodo.text, id: nanoid() }));
        console.log(todo);
    };
    return (
        <div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center w-full gap-2 px-8 py-2 bg-white border rounded-full shadow-md shadow-slate-500 h-14"
            >
                <input
                    type="text"
                    className="flex-grow h-full px-2 outline-none"
                    placeholder="Add todo..."
                    value={currentTodo.text}
                    name="text"
                    onChange={(e) => {
                        handleTodoChange(e);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            updateTodoText();
                        }
                    }}
                />

                <button
                    onClick={() => updateTodoText()}
                    className="grid w-8 h-8 pb-2 text-3xl font-extrabold text-white bg-green-600 rounded-full place-content-center"
                >
                    +
                </button>
            </form>
        </div>
    );
}

export default InputArea;
