import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../index";
export const baseUrl = "http://192.168.43.35:3001";

interface stateProps {
  status: "idle" | "loading" | "success" | "failed";
  user: {
    userToken: string;
    userId: number;
    username: string;
    email: string;
    accountBalance: number;
  };
  showGetStarted: boolean;
}

const initialState: stateProps = {
  status: "idle",
  user: {
    userToken: "",
    userId: -1,
    username: "",
    email: "",
    accountBalance: 1000,
  },
  showGetStarted: true,
};

interface ISignupResponse {
  error: boolean;
  message: string;
}
interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

//signup thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: IFormData) => {
    const { data } = await axios.post<ISignupResponse>(
      `${baseUrl}/auth/signup`,
      formData
    );

    return data;
  }
);
interface ISigninFormData {
  email: string;
  password: string;
}
interface ISigninpResponse {
  error: boolean;
  user: {
    userToken: string;
    userId: number;
    username: string;
    email: string;
    accountBalance: number;
  };
}

export const signin = createAsyncThunk(
  "auth/signin",
  async (formData: ISigninFormData) => {
    const { data } = await axios.post<ISigninpResponse>(
      `${baseUrl}/auth/signin`,
      formData
    );
    return data;
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    getStarted: (state, action: PayloadAction<boolean>) => {
      state.showGetStarted = action.payload;
    },
    setUser: (state) => {
      state.user.userToken = "sdgjhsgdhghd";
    },
    pay: (state, action: PayloadAction<number>) => {
      state.user.accountBalance = state.user.accountBalance - action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.status = "success";
      } else {
        state.status = "failed";
      }
    });
    builder.addCase(signup.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(signin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
        state.user = action.payload.user;
      }
    }),
      builder.addCase(signin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { getStarted, pay, setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.User;

export default userSlice.reducer;
