import { configureStore } from "@reduxjs/toolkit";
import telegramLoginSLice from "./Slices/telegramLoginSLice";
import homePageSlice from "./Slices/homePageSlice";
import boostsSlice from "./Slices/boostsSlice";

export const store = configureStore({
  reducer: {
    telegramLogin: telegramLoginSLice,
    homePage: homePageSlice,
    boosts: boostsSlice
  }
});
