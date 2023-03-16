import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        value: { text: "Todo text", id: null, checkness: false },
        allTodos: [],
    },
    reducers: {
        add: (state, action) => {
            state.allTodos = [...state.allTodos, action.payload];
            state.value = { text: "", id: null, checkness: false };
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
            let indexToEdit = state.allTodos.findIndex(
                (el) => el.id === action.payload
            );

            let { text, checkness } = state.allTodos[indexToEdit];
            let tempTodos = [...state.allTodos];

            tempTodos[indexToEdit] = {
                text: text,
                id: action.payload,
                checkness: !checkness,
            };

            state.allTodos = [...tempTodos];
        },
        selectTodo: (state, action) => {
            let indexToEdit = state.allTodos.findIndex(
                (el) => el.id === action.payload
            );
            let { text, id, checkness } = state.allTodos[indexToEdit];

            state.value = { text, id, checkness };
            console.log(state.value);
        },
    },
});

export const { deleteTodo, add, updateTodo, selectTodo } = todoSlice.actions;
export default todoSlice.reducer;
