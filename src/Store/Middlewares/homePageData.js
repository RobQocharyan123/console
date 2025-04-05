import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  homePageDailyCode,
  homePageDailyPoint,
  homePageGetData,
  loginPostUserData
} from "./../../Commons/Services/homePageService";
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
);

export const getHomePageDataThunk = createAsyncThunk(
  "get/home/data",
  async (token) => {
    try {
      const response = await homePageGetData(token);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const sendDailyCodeThunk = createAsyncThunk(
  "put/home/dailyCode",
  async ({ data, token }) => {
    try {
      const response = await homePageDailyCode(data, token);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const sendDailyPointThunk = createAsyncThunk(
  "put/home/dailyPoint",
  async ({ token }) => {
    try {
      const response = await homePageDailyPoint(token);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
