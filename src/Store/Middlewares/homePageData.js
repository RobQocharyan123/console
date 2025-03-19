import { createAsyncThunk } from "@reduxjs/toolkit";
import { homePageGetData } from "./../../Commons/Services/homePageService";

export const getHomePageDataThunk = createAsyncThunk(
  "get/chome/data",
  async (id) => {
    try {
      const response = await homePageGetData();
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
