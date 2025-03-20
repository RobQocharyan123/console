import { configureStore } from "@reduxjs/toolkit";
import telegramLoginSLice from "./Slices/telegramLoginSLice";
import homePageSlice from "./Slices/homePageSlice";

export const store = configureStore({
  reducer: {
    telegramLogin: telegramLoginSLice,
    homePage:homePageSlice
  }
});
