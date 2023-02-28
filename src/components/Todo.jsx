import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Todo = ({
    text = "This is the todo",
    id,
    deleteOneTodo,
    isChecked,
    changeCheckness,
    changeTodoText,
}) => {
    // const [isChecked, setIsChecked] = useState(false);
    return (
        <span className="flex gap-4 items-center">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => changeCheckness(id)}
            />
            <span
                className={`flex-grow ${
                    isChecked && "line-through text-gray-600"
                }`}
            >
                {text[0].toUpperCase() + text.slice(1, text.length)}
            </span>
            <span className="text-xl py-2 px-4 flex gap-2">
                <span
                    className={`text-red-400 `}
                    onClick={() => {
                        deleteOneTodo(id);
                    }}
                >
                    <FaTrash />
                </span>
                <span
                    className={`text-green-400 `}
                    onClick={() => {
                        changeTodoText(id);
                    }}
                >
                    <FaEdit />
                </span>
            </span>
        </span>
    );
};
export default Todo;
