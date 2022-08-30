import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import FarmerReducer from "./features/famerSlice";
import DistributorReducer from "./features/distributorSlice";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Farmers: FarmerReducer,
    Distributors: DistributorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
