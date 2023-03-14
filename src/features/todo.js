import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: { value: { text: "Todo text", id: null } },
    reducers: {
        add: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { add } = todoSlice.actions;
export default todoSlice.reducer;
