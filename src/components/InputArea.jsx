import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, updateTodoValue } from "../features/todo";
import { nanoid } from "nanoid";

function InputArea() {
    const todo = useSelector((state) => state.todo.value);
    const [currentTodo, setCurrentTodo] = useState({
        text: todo.text,
        id: todo.id,
        checkness: todo.checkness,
    });
    useEffect(() => {
        setCurrentTodo(todo);
    }, [todo]);

    const dispatch = useDispatch();

    const handleTodoChange = (e) => {
        const { value } = e.target;
        setCurrentTodo({
            text: value,
            id: currentTodo.id,
            checkness: currentTodo.checkness,
        });
    };

    const updateTodoText = () => {
        if (currentTodo.text.trim() === "") return;

        if (currentTodo.id) {
            dispatch(updateTodoValue(currentTodo));
        } else {
            dispatch(
                add({ text: currentTodo.text, id: nanoid(), checkness: false })
            );
        }
        setCurrentTodo({ text: "", id: null, checkness: false });
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
