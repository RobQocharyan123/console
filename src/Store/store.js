import { configureStore } from "@reduxjs/toolkit";
import telegramLoginSLice from "./Slices/telegramLoginSLice";

export const store = configureStore({
  reducer: {
    telegramLogin: telegramLoginSLice
  }
});
