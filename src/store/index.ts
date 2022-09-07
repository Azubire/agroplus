import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import FarmerReducer from "./features/famerSlice";
import DistributorReducer from "./features/distributorSlice";
import CartReducer from "./features/cartSlice";
import AdSliceReducer from "./features/adSlice";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Farmers: FarmerReducer,
    Distributors: DistributorReducer,
    Cart: CartReducer,
    Ad: AdSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
