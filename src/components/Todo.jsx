import { FaEdit, FaTrash } from "react-icons/fa";

const Todo = ({
    text = "This is the todo",
    id,
    deleteOneTodo,
    isChecked,
    changeCheckness,
    todoTextUpdator,
}) => {
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
                        todoTextUpdator(id);
                    }}
                >
                    <FaEdit />
                </span>
            </span>
        </span>
    );
};
export default Todo;
