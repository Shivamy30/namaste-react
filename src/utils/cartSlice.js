import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.total += 1;
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id!== action.payload);
            state.total -= 1;
        },
        clearCart: (state, action) => {
            state.items = [];
            state.total = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;