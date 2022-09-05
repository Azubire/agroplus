import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const img1 = require("../../../assets/app_images/distributors/img1.jpg");
const img2 = require("../../../assets/app_images/distributors/img2.jpg");

export interface IDistributor {
  id: number;
  img: any;
  name: string;
  email: string;
  contact: string;
  website: string;
  profile: string;
  createdAt: string;
  transactions: number;
  location: string;
  ratings: number;
}

interface IInitialState {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  data: IDistributor[];
}

const initialState: IInitialState = {
  error: false,
  status: "idle",
  data: [
    {
      id: 1,
      img: img1,
      name: "Md Crops Ghana",
      email: "mdghana@gmail.com",
      contact: "+2335687598",
      website: "https://mdghana.com",
      profile:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi laboriosam voluptates possimus atque debitis ab officiis. Odit laboriosam, nemo, adipisci reiciendis iusto voluptate facere possimus, eligendi omnis distinctio consequuntur. Dolore!",
      createdAt: "2nd June 2022 15:05PM",
      transactions: 48,
      location: "Greater Accra, Tema",
      ratings: 234,
    },
    {
      id: 2,
      img: img2,
      name: "Dealgood ventures",
      email: "mdghana@gmail.com",
      contact: "+2335687598",
      website: "https://mdghana.com",
      profile:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi laboriosam voluptates possimus atque debitis ab officiis. Odit laboriosam, nemo, adipisci reiciendis iusto voluptate facere possimus, eligendi omnis distinctio consequuntur. Dolore!",
      createdAt: "3rd June 2022 15:05PM",
      transactions: 25,
      location: "Northern Region, Tamale",
      ratings: 78,
    },
    {
      id: 3,
      img: img1,
      name: "Cash Crops",
      email: "mdghana@gmail.com",
      contact: "+2335687598",
      website: "https://mdghana.com",
      profile:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi laboriosam voluptates possimus atque debitis ab officiis. Odit laboriosam, nemo, adipisci reiciendis iusto voluptate facere possimus, eligendi omnis distinctio consequuntur. Dolore!",
      createdAt: "2nd June 2022 15:05PM",
      transactions: 975,
      location: "Ashanti Region, Kumasi",
      ratings: 154,
    },
  ],
};

const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {},
});

export const getDistributors = (state: RootState) => state.Distributors;

export const filterDistributor = (id: number) => (state: RootState) =>
  state.Distributors.data.filter((distributor) => distributor.id === id);

export default distributorSlice.reducer;
