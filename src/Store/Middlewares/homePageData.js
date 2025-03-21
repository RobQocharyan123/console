import { createAsyncThunk } from "@reduxjs/toolkit";
import { homePageDailyCode, homePageDailyPoint, homePageGetData, loginPostUserData } from "./../../Commons/Services/homePageService";
import Success from "../../Commons/Components/Success/Success";



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



export const sendDailyCodeThunk = createAsyncThunk(
  "put/home/dailyCode",
  async (data) => {
    try {
      const response = await homePageDailyCode(data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);



export const sendDailyPointThunk = createAsyncThunk(
  "put/home/dailyPoint",
  async () => {
    try {
      const response = await homePageDailyPoint();
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);


