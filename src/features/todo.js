import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: { value: { text: "Todo text", id: null }, allTodos: [] },
    reducers: {
        add: (state, action) => {
            state.value = action.payload;
            state.allTodos = [...state.allTodos, action.payload];
        },
        deleteTodo: (state, action) => {
            let indexToDelete = state.allTodos.findIndex(
                (el) => el.id === action.payload
            );

            state.allTodos = [
                ...state.allTodos.slice(0, indexToDelete),
                ...state.allTodos.slice(
                    indexToDelete + 1,
                    state.allTodos.length
                ),
            ];
        },
        updateTodo: (state, action) => {
            console.log(action.payload);
        },
    },
});
export const { deleteTodo, add, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
