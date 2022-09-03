import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ICart {
  id: number | undefined;
  img: any;
  title: string | undefined;
  price: number;
  quantity: number;
}

interface IInitialState {
  isOpen: boolean;
  totalItemPrice: number;
  items: ICart[];
}

const initialState: IInitialState = {
  isOpen: false,
  totalItemPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, payload: PayloadAction<ICart>) => {
      const item = state.items.find((item) => item.id === payload.payload.id);
      if (item) {
        state.items = state.items.map((item) =>
          item.id === payload.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items = [...state.items, payload.payload];
      }

      state.totalItemPrice = state.items.reduce((prev, cur) => {
        return prev + cur.price * cur.quantity;
      }, 0);
      state.isOpen = true;
    },
    removeFromCart: (state, payload: PayloadAction<number>) => {
      state.items.filter((item) => item.id !== payload.payload);
    },
    dismissCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { removeFromCart, addToCart, dismissCart } = cartSlice.actions;

export const getCart = (state: RootState) => state.Cart;
// export const getTotalPrice = (state)

export default cartSlice.reducer;
