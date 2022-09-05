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
  description: string;
  price: number;
  category: string;
  favourite: boolean;
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
    farmer: [
      {
        id: 1,
        img: fImg4,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident quaerat non alias quasi, nobis eius delectus ullam perferendis expedita vitae nihil, optio similique suscipit enim quibusdam temporibus quidem impedit.",
        price: 452,
        createdAt: "22nd May,2022 | 2:00PM",
        title: "Fresh maize from the farm  and bla bla bla",
        category: "cereal",
        favourite: false,
      },
      {
        id: 2,
        img: fImg5,
        title: "Fresh rice from the farm ",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident quaerat non alias quasi, nobis eius delectus ullam perferendis expedita vitae nihil, optio similique suscipit enim quibusdam temporibus quidem impedit.",
        price: 452,
        createdAt: "22nd May,2022 | 2:00PM",
        category: "cereal",
        favourite: true,
      },
    ],

    newProduce: [
      {
        id: 6,
        img: fImg6,
        title: "Fresh Potatoes ",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident quaerat non alias quasi, nobis eius delectus ullam perferendis expedita vitae nihil, optio similique suscipit enim quibusdam temporibus quidem impedit.",
        price: 452,
        createdAt: "22nd May,2022 | 2:00PM",
        category: "cereal",
        favourite: true,
      },
      {
        id: 7,
        img: fImg7,
        title: "Sweet potatoes",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident quaerat non alias quasi, nobis eius delectus ullam perferendis expedita vitae nihil, optio similique suscipit enim quibusdam temporibus quidem impedit.",
        price: 452,
        createdAt: "22nd May,2022 | 2:00PM",
        category: "cereal",
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
