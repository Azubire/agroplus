import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface stateProps {
  user: { email: string | null; password: string | null; isLoggedIn: boolean };
  showGetStarted: boolean;
}

const initialState: stateProps = {
  user: { email: null, password: null, isLoggedIn: true },
  showGetStarted: true,
};

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        isLoggedIn: boolean;
      }>
    ) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { email: null, password: null, isLoggedIn: false };
    },
    getStarted: (state, action: PayloadAction<boolean>) => {
      state.showGetStarted = action.payload;
    },
  },
});

export const { login, logout, getStarted } = userSlice.actions;

// export const getUser = (state) => state.User.user;

export default userSlice.reducer;
