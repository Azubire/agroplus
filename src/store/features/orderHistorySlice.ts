import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export const baseUrl = "http://192.168.43.35:3001";

export interface IOrderDetails {
  id: number;
  price: number;
  productId: number;
  qty: number;
  Ad: {
    id: number;
    title: string;
    price: number;
    img: string;
    User: {
      fullname: string;
    };
    Category: {
      name: string;
    };
  };
}

interface IInitialState {
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
  data: {
    id: number;
    grandTotal: number;
    paymentStatus: "paid" | "unpaid";
    viewed: number;
    deliveryStatus: "delivered" | "pending" | "rejected";
    orderCode: string;
    userId: number;
    createdAt: string;
    OrderDetails: Array<IOrderDetails>;
  }[];
}

export const getOrderHistory = createAsyncThunk(
  "getOrderHistory",
  async (id: number, { rejectWithValue }) => {
    const { data } = await axios.get<IInitialState>(
      `${baseUrl}/orders/user/orders/${id}`
    );

    if (data.error) {
      return rejectWithValue({ error: true });
    }

    return data;
  }
);

const initialState: IInitialState = {
  status: "idle",
  error: false,
  data: [],
};
const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.status = "success";
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.meta.rejectedWithValue);
        state.status = "failed";
      });
  },
});

export const getOrderHistoryState = (state: RootState) => state.OrderHistory;

export const getOrderDetails = (id: number) => (state: RootState) =>
  state.OrderHistory.data.find((order) => {
    return order.id === id;
  });

export default orderHistorySlice.reducer;
