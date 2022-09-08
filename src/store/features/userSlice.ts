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
    img: string;
    accountBalance: number;
    totalSales: number;
  };
  showGetStarted: boolean;
  isDistributor:
    | {
        id: number;
        img: string;
        name: string;
        email: string;
        contact: string;
        website: string;
        profile: string;
        transactions: number;
        location: string;
        ratings: number;
        createdAt: string;
      }
    | undefined;
}

const initialState: stateProps = {
  status: "idle",
  user: {
    userToken: "",
    userId: -1,
    username: "",
    email: "",
    img: "",
    accountBalance: 0,
    totalSales: 0,
  },
  showGetStarted: true,
  isDistributor: undefined,
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
    img: string;
    accountBalance: number;
    totalSales: number;
  };
  isDistributor:
    | {
        id: number;
        img: string;
        name: string;
        email: string;
        contact: string;
        website: string;
        profile: string;
        transactions: number;
        location: string;
        ratings: number;
        createdAt: string;
      }
    | undefined;
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

export const updateProfilePhoto = createAsyncThunk(
  "user/update/profile",
  async (formData: { photo: any; id: number }) => {
    const { data } = await axios.put<{ error: boolean; img: string }>(
      `${baseUrl}/auth/update/${formData.id}`,
      formData.photo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }
);

export const verifyToken = createAsyncThunk(
  "verifyToken",
  async (requestData: { email: string; userToken: string }) => {
    const { data } = await axios.post<ISigninpResponse>(
      `${baseUrl}/auth/verifytoken`,
      requestData.email,
      {
        headers: { Authorization: `Bearer ${requestData.userToken}` },
      }
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
      // state.user.userToken = "sdgjhsgdhghd";
    },
    updateAccountBalance: (state, action: PayloadAction<number>) => {
      state.user.accountBalance = action.payload;
    },
    pay: (state, action: PayloadAction<number>) => {
      state.user.accountBalance = state.user.accountBalance - action.payload;
    },
    logout: (state) => {
      (state.user = {
        userToken: "",
        userId: -1,
        username: "",
        email: "",
        img: "",
        accountBalance: 0,
        totalSales: 0,
      }),
        (state.isDistributor = undefined);
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
        state.isDistributor = action.payload.isDistributor;
      }
    }),
      builder.addCase(signin.rejected, (state) => {
        state.status = "failed";
      });
    builder.addCase(updateProfilePhoto.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateProfilePhoto.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
        state.user.img = action.payload.img;
      }
    });
    builder.addCase(updateProfilePhoto.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
        state.user = action.payload.user;
        state.isDistributor = action.payload.isDistributor;
      }
    });
  },
});

export const { getStarted, pay, setUser, logout, updateAccountBalance } =
  userSlice.actions;

export const getUser = (state: RootState) => state.User;

export default userSlice.reducer;
