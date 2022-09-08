import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ICart {
  productId: number;
  img: any;
  title: string;
  price: number;
  qty: number;
  userId: number;
  distributorId: number;
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
      const item = state.items.find(
        (item) => item.productId === payload.payload.productId
      );
      if (item) {
        state.items = state.items.map((item) =>
          item.productId === payload.payload.productId
            ? { ...item, quantity: item.qty + 1 }
            : item
        );
      } else {
        state.items = [...state.items, payload.payload];
      }

      state.totalItemPrice = state.items.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0);
      state.isOpen = true;
    },
    increaseQuantity: (state, payload: PayloadAction<number>) => {
      state.items.map((item) =>
        item.productId === payload.payload
          ? { ...item, quantity: item.qty++ }
          : item
      );
      state.totalItemPrice = state.items.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0);
    },
    decreaseQuantity: (state, payload: PayloadAction<number>) => {
      state.items.map((item) =>
        item.productId === payload.payload
          ? { ...item, quantity: item.qty-- }
          : item
      );
      state.totalItemPrice = state.items.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0);
    },
    removeFromCart: (state, payload: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== payload.payload
      );
      state.totalItemPrice = state.items.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0);
    },
    dismissCart: (state) => {
      state.isOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  removeFromCart,
  addToCart,
  dismissCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state: RootState) => state.Cart;
// export const getTotalPrice = (state)

export default cartSlice.reducer;
