import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Context } from "./Provider";

const Todo = ({ text = "This is the todo", id, isChecked }) => {
    const { selectOneTodo, deleteOneTodo, changeCheckness } =
        useContext(Context);
    return (
        <span className="flex items-center gap-4">
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
            <span className="flex gap-2 px-4 py-2 text-xl">
                <span
                    className={`text-red-400 hover:cursor-pointer bg-gray-200 rounded-full p-2`}
                    onClick={() => {
                        deleteOneTodo(id);
                    }}
                >
                    <FaTrash />
                </span>
                <span
                    className={`text-green-400 bg-gray-200 rounded-full p-2 hover:cursor-pointer`}
                    onClick={() => {
                        selectOneTodo(id);
                    }}
                >
                    <FaEdit />
                </span>
            </span>
        </span>
    );
};
export default Todo;
