import { createSlice } from "@reduxjs/toolkit";
import { loginTelegramBotThunk } from "../Middlewares/homePageData";

const initialState = {
  userData: null,
  loading: false,
  isSuccess: false,
  token: null
};

const telegramLoginSLice = createSlice({
  name: "telegramLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginTelegramBotThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTelegramBotThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isSuccess = true;
        state.token = action.payload.accessToken;
      })
      .addCase(loginTelegramBotThunk.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      });
  }
});

// export const {  } =  telegramLoginSLice.actions;

export default telegramLoginSLice.reducer;
