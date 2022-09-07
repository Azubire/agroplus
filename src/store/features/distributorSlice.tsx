import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

const baseUrl = "http://192.168.43.35:3001";

export interface IDistributor {
  id: number;
  img: string;
  name: string;
  email: string;
  contact: string;
  website: string;
  profile: string;
  createdAt: string;
  transactions: number;
  userId: number;
  location: string;
  ratings: number;
}

interface IInitialState {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  data: IDistributor[];
}

export const createDistributor = createAsyncThunk(
  "distributor/create",
  async (formData: any) => {
    const { data } = await axios.post<{ error: boolean }>(
      `${baseUrl}/distributors/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }
);

export const getDistributorsFromDb = createAsyncThunk(
  "distributors",
  async () => {
    const { data } = await axios.get<{ error: boolean; data: IDistributor[] }>(
      `${baseUrl}/distributors`
    );

    return data;
  }
);

const initialState: IInitialState = {
  error: false,
  status: "idle",
  data: [],
};

const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createDistributor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDistributor.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
        // state.data = action.payload.data;
      }
    });
    builder.addCase(createDistributor.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getDistributorsFromDb.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDistributorsFromDb.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      } else {
        state.status = "success";
        state.data = action.payload.data;
      }
    });
    builder.addCase(getDistributorsFromDb.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getDistributors = (state: RootState) => state.Distributors;

export const filterDistributor = (id: number) => (state: RootState) =>
  state.Distributors.data.filter((distributor) => distributor.id === id);

export default distributorSlice.reducer;
