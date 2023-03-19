import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Provider";

const InputArea = () => {
    const { temporaryTodo, increaseTodos, updateTodoText } =
        useContext(Context);

    const [todo, setTodo] = useState(temporaryTodo);

    const handleTodoChange = (e) => {
        const { value } = e.target;
        setTodo({ text: value, id: temporaryTodo.id, checkness: false });
    };
    useEffect(() => {
        setTodo(temporaryTodo);
    }, [temporaryTodo]);

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full gap-2 px-8 py-2 bg-white border rounded-full shadow-md shadow-slate-500 h-14"
        >
            <input
                type="text"
                className="flex-grow h-full px-2 outline-none"
                placeholder="Add todo..."
                value={todo.text}
                name="text"
                onChange={(e) => {
                    handleTodoChange(e);
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        todo.id ? updateTodoText(todo) : increaseTodos(todo);
                    }
                }}
            />
            <button
                onClick={() =>
                    todo.id ? updateTodoText(todo) : increaseTodos(todo)
                }
                className="grid w-8 h-8 pb-2 text-3xl font-extrabold text-white bg-green-600 rounded-full place-content-center"
            >
                +
            </button>
        </form>
    );
};

export default InputArea;
