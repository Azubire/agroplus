import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

const fImg2 = require("../../../assets/app_images/farmers/img2.png");
const fImg3 = require("../../../assets/app_images/farmers/img3.png");
const fImg4 = require("../../../assets/app_images/farmers/img4.png");
const fImg5 = require("../../../assets/app_images/farmers/img5.png");
const fImg6 = require("../../../assets/app_images/farmers/img6.png");
const fImg7 = require("../../../assets/app_images/farmers/img7.png");
const fImg8 = require("../../../assets/app_images/farmers/img8.png");
const baseUrl = "http://192.168.43.35:3001";

export interface IFarmer {
  id: number;
  img: any;
  title: string;
  description: string;
  price: number;
  userId: number;
  category: string;
  createdAt: string;
}

interface InitialStateTypes {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  data: {
    farmer: Array<IFarmer>;
    newProduce: Array<IFarmer>;
  };
}

const initialState: InitialStateTypes = {
  error: false,
  status: "idle",
  data: {
    farmer: [],

    newProduce: [],
  },
};

export const getAds = createAsyncThunk("ads", async () => {
  const { data } = await axios.get<InitialStateTypes>(`${baseUrl}/farmers`);

  return data;
});

const farmerSlice = createSlice({
  name: "farmers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAds.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
      }
      {
        state.status = "success";
        state.data = action.payload.data;
      }
    });
    builder.addCase(getAds.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const getFarmerState = (state: RootState) => state.Farmers;

export const getProduce = (id: number) => (state: RootState) =>
  state.Farmers.data.farmer.filter((produce) => produce.id === id);

export const getRelatedProduce = (id: number) => (state: RootState) => {
  const array: Array<Number> = [];

  for (let i = 1; i <= 2; i++) {
    array.push(i === 1 ? id + 1 : id - 1);
  }

  const newArray = state.Farmers.data.farmer.filter((item) => {
    return array.includes(item.id);
  });

  return newArray;
};

export default farmerSlice.reducer;
