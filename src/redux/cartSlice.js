import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
    try {
        return JSON.parse(
            localStorage.getItem('techstore_cart')
        ) || [];
    } catch {
        return [];
    }
};

const initialState = {
    items: loadCart(),
    totalCount: loadCart().reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: loadCart().reduce((sum, item) => sum + item.price * item.quantity, 0),

    discountPercent: 0

};
const recalculateTotals = (state) => {
    state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    localStorage.setItem('techstore_cart', JSON.stringify(state.items));
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                // Grace a Immer , la mutation directe produit un snapshot immuable
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            recalculateTotals(state);
        },
        removeItem: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload);
            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                }
            }
            recalculateTotals(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
            localStorage.setItem('techstore_cart', JSON.stringify([]));
        },
        applyPromoCode: (state, action) => {
            if (action.payload === 'POLY2027') {
                state.discountPercent = 20;
            } else {
                state.discountPercent = 0;
            }
        },
    }
});

export const { addItem, removeItem, clearCart , applyPromoCode} = cartSlice.actions;
export default cartSlice.reducer;