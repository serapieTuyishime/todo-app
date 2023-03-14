import React from "react";
import Todo from "./Todo";

const DisplayArea = () => {
    return (
        <div className="grid gap-2 overflow-y-auto">
            {[{ text: "boom", id: 345, checkness: true }].map((todo, index) => {
                return (
                    <Todo
                        text={todo.text}
                        id={todo.id}
                        key={index}
                        isChecked={todo.checkness}
                        // deleteOneTodo={deleteOneTodo}
                        // changeCheckness={changeCheckness}
                        // todoTextUpdator={todoTextUpdator}
                    />
                );
            })}
        </div>
    );
};

export default DisplayArea;
