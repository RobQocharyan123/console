import { createSlice } from "@reduxjs/toolkit";
import { loginTelegramBotThunk } from "../Middlewares/homePageData";

const initialState = {
  userData: null,
  loading: false,
  isSuccess: true,

};

const telegramLoginSLice = createSlice({
  name: "telegramLogin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTelegramBotThunk.pending, (state) => {
        state.loading = true;
        // state.isSuccess = true;
        state.error = null;
      })
      .addCase(loginTelegramBotThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(loginTelegramBotThunk.rejected, (state, action) => {
        state.loading = false;
        // state.isSuccess = false;
        state.error = action.payload;
      });
  }
});

// export const {  } =  telegramLoginSLice.actions;

export default telegramLoginSLice.reducer;
