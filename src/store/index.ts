import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import FarmerReducer from "./features/famerSlice";
import DistributorReducer from "./features/distributorSlice";
import CartReducer from "./features/cartSlice";
import AdSliceReducer from "./features/adSlice";
import OrderSliceReducer from "./features/orderSlice";
import OrderHistoryReducer from "./features/orderHistorySlice";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Farmers: FarmerReducer,
    Distributors: DistributorReducer,
    Cart: CartReducer,
    Ad: AdSliceReducer,
    Orders: OrderSliceReducer,
    OrderHistory: OrderHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
