import { createAsyncThunk } from "@reduxjs/toolkit";
import { homePageGetData, loginPostUserData } from "./../../Commons/Services/homePageService";



export const loginTelegramBotThunk = createAsyncThunk(
  "post/login/userData",
  async (userData) => {
    try {
      const response = await loginPostUserData(userData);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

)

export const getHomePageDataThunk = createAsyncThunk(
  "get/home/data",
  async () => {
    try {
      const response = await homePageGetData();
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
