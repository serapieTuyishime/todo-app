import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "./features/todo";
import todoReducer from "../features/todo";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});
