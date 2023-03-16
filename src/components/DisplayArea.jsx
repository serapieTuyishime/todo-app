import React from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../features/todo";

const DisplayArea = () => {
    const allTodos = useSelector((state) => state.todo.allTodos);
    const dispatch = useDispatch();
    function deleteOneTodo(todoId) {
        dispatch(deleteTodo(todoId));
    }

    function changeCheckness(id) {
        console.log("checking a todo");
    }

    return (
        <div className="grid gap-2 overflow-y-auto">
            {allTodos.map((todo, index) => {
                return (
                    <Todo
                        text={todo.text}
                        id={todo.id}
                        key={index}
                        isChecked={todo.checkness}
                        deleteOneTodo={deleteOneTodo}
                        changeCheckness={changeCheckness}
                        // todoTextUpdator={todoTextUpdator}
                    />
                );
            })}
        </div>
    );
};

export default DisplayArea;
