import { createSlice } from "@reduxjs/toolkit";
import { boostDataThunk } from "../Middlewares/boostBuyData";
import { loginTelegramBotThunk } from "../Middlewares/homePageData";

const initialState = {
  boostData: [],
  loading: false,
  isSuccess: false
};

const boostSlice = createSlice({
  name: "boosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(boostDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(boostDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.boostData = action.payload;
      })
      .addCase(boostDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
      });
  }
});

// export const {  } =  boostSlice.actions;

export default boostSlice.reducer;
