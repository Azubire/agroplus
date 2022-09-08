import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { number } from "joi";
import { RootState } from "..";
export const baseUrl = "http://192.168.43.35:3001";

interface IInitialState {
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
  message: string;
  userId: number | undefined;
  data: {
    paymentType: string;
    items: { id: number; price: number; quantity: number }[];
  };
}

const initialState: IInitialState = {
  status: "idle",
  error: false,
  message: "",
  userId: undefined,
  data: {
    paymentType: "",
    items: [],
  },
};

export const pay = createAsyncThunk(
  "order/pay",
  async (orderData: {
    userId: number;
    data: {
      paymentType: string;
      grandTotal: number;
      items: {
        productId: number;
        price: number;
        qty: number;
        userId: number;
        distributorId: number;
      }[];
    };
  }) => {
    const { data } = await axios.post<IInitialState>(
      `${baseUrl}/orders/create/${orderData.userId}`,
      orderData.data
    );

    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(pay.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(pay.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = true;
        state.status = "failed";
        state.message = action.payload.message;
      } else {
        state.error = false;
        state.status = "success";
        state.message = action.payload.message;
      }
    });
    builder.addCase(pay.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export const getOrders = (state: RootState) => state.Orders;

export default orderSlice.reducer;
