import { createSlice } from "@reduxjs/toolkit";
import { loginTelegramBotThunk } from "../Middlewares/homePageData";

const initialState = {
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
      })
      .addCase(loginTelegramBotThunk.fulfilled, (state, action) => {
        if (action.payload?.status === 200) {
          state.isSuccess = true;
          state.token = action.payload.accessToken;
        } else {
          state.isSuccess = false;
          state.token = null;
        }
        state.loading = false;
      })

      .addCase(loginTelegramBotThunk.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
      });
  }
});

// export const {  } =  telegramLoginSLice.actions;

export default telegramLoginSLice.reducer;
