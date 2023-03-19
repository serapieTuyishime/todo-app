import React, { useContext } from "react";
import { Context } from "./Provider";
import Todo from "./Todo";

const DisplayArea = () => {
    const { todos } = useContext(Context);
    return (
        <div className="grid gap-2 overflow-y-auto">
            {todos.map((todo, index) => {
                return (
                    <Todo
                        text={todo.text}
                        id={todo.id}
                        key={index}
                        isChecked={todo.checkness}
                    />
                );
            })}
        </div>
    );
};

export default DisplayArea;
