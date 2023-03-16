import { createSlice } from "@reduxjs/toolkit";

const loadLocalStorage = () => {
    return window.localStorage.getItem("todos")
        ? [...JSON.parse(window.localStorage.getItem("todos"))]
        : [{ text: "From local storage", id: null, checkness: false }];
};
const updateLocalStorage = (state) => {
    window.localStorage.setItem("todos", JSON.stringify(state.allTodos));
};

const findTodoById = (state, id) => {
    return state.allTodos.findIndex((el) => el.id === id);
};
export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        value: { text: "", id: null, checkness: false },
        allTodos: loadLocalStorage(),
    },
    reducers: {
        add: (state, action) => {
            state.allTodos = [...state.allTodos, action.payload];
            state.value = { text: "", id: null, checkness: false };
            updateLocalStorage(state);
        },
        deleteTodo: (state, action) => {
            let indexToDelete = findTodoById(state, action.payload);

            state.allTodos = [
                ...state.allTodos.slice(0, indexToDelete),
                ...state.allTodos.slice(
                    indexToDelete + 1,
                    state.allTodos.length
                ),
            ];
            updateLocalStorage(state);
        },
        updateTodoCheckness: (state, action) => {
            let indexToEdit = findTodoById(state, action.payload);

            let { text, checkness } = state.allTodos[indexToEdit];
            let tempTodos = [...state.allTodos];

            tempTodos[indexToEdit] = {
                text: text,
                id: action.payload,
                checkness: !checkness,
            };

            state.allTodos = [...tempTodos];
            updateLocalStorage(state);
        },
        selectTodo: (state, action) => {
            let indexToEdit = findTodoById(state, action.payload);

            let { text, id, checkness } = state.allTodos[indexToEdit];

            state.value = { text, id, checkness };
        },
        updateTodoValue: (state, action) => {
            let indexToEdit = findTodoById(state, action.payload.id);

            let tempTodos = [...state.allTodos];

            tempTodos[indexToEdit] = {
                text: action.payload.text,
                id: action.payload.id,
                checkness: action.payload.checkness,
            };

            state.allTodos = [...tempTodos];
            updateLocalStorage(state);
        },
    },
});

export const {
    deleteTodo,
    add,
    updateTodoCheckness,
    selectTodo,
    updateTodoValue,
} = todoSlice.actions;
export default todoSlice.reducer;
