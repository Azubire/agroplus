import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const fImg2 = require("../../../assets/app_images/farmers/img2.png");
const fImg3 = require("../../../assets/app_images/farmers/img3.png");
const fImg4 = require("../../../assets/app_images/farmers/img4.png");
const fImg5 = require("../../../assets/app_images/farmers/img5.png");
const fImg6 = require("../../../assets/app_images/farmers/img6.png");
const fImg7 = require("../../../assets/app_images/farmers/img7.png");
const fImg8 = require("../../../assets/app_images/farmers/img8.png");

export interface IFarmer {
  id: number;
  img: any;
  title: string;
  category: string;
  favourite: boolean;
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
    farmer: [
      {
        id: 1,
        img: fImg4,
        title: "Fresh maize from the farm ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 2,
        img: fImg5,
        title: "Fresh rice from the farm ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 3,
        img: fImg3,
        title: "Fresh wheat",
        category: "cereal",
        favourite: true,
      },
      {
        id: 4,
        img: fImg2,
        title: "Fresh Vegetables ",
        category: "Vegetable",
        favourite: false,
      },
      {
        id: 5,
        img: fImg2,
        title: "Big cassava freshly cultivated ",
        category: "Root And Tuber",
        favourite: true,
      },
      {
        id: 6,
        img: fImg6,
        title: "Fresh Potatoes ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 7,
        img: fImg7,
        title: "Sweet potatoes",
        category: "cereal",
        favourite: false,
      },
      {
        id: 8,
        img: fImg8,
        title: "Fresh Watermelons ",
        category: "cereal",
        favourite: false,
      },
    ],

    newProduce: [
      {
        id: 6,
        img: fImg6,
        title: "Fresh Potatoes ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 7,
        img: fImg7,
        title: "Sweet potatoes",
        category: "cereal",
        favourite: false,
      },
      {
        id: 8,
        img: fImg8,
        title: "Fresh Watermelons ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 5,
        img: fImg2,
        title: "Cassava freshly cultivated ",
        category: "Root And Tuber",
        favourite: true,
      },
      {
        id: 1,
        img: fImg4,
        title: "Fresh maize from the farm ",
        category: "cereal",
        favourite: false,
      },
      {
        id: 2,
        img: fImg5,
        title: "Fresh rice from the farm ",
        category: "cereal",
        favourite: true,
      },
      {
        id: 3,
        img: fImg3,
        title: "Fresh wheat",
        category: "cereal",
        favourite: true,
      },
      {
        id: 4,
        img: fImg2,
        title: "Fresh Vegetables  ",
        category: "Vegetable",
        favourite: false,
      },
    ],
  },
};

const farmerSlice = createSlice({
  name: "farmers",
  initialState,
  reducers: {},
});

export const getFarmerState = (state: RootState) => state.Farmers;

export default farmerSlice.reducer;
