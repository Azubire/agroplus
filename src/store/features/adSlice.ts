import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

const baseUrl = "http://192.168.43.35:3001";

interface IInitialState {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  message: string;
}

const initialState: IInitialState = {
  error: false,
  status: "idle",
  message: "",
};

export const createAd = createAsyncThunk("ad/create", async (formData: any) => {
  const { data } = await axios.post<IInitialState>(
    `${baseUrl}/ad/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
});

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createAd.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createAd.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
      }
    });
    builder.addCase(createAd.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getAdState = (state: RootState) => state.Ad;

export default adSlice.reducer;
