import { createSlice } from "@reduxjs/toolkit";
import {
  getHomePageDataThunk,
  sendDailyCodeThunk,
  sendDailyPointThunk
} from "../Middlewares/homePageData";

const initialState = {
  homeData: null,
  loading: false,
  showSuccess: false
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setCloseSuccess: (state) => {
      state.showSuccess = false;
    },
    setUpdateHomeData: (state, action) => {
      state.homeData = action.payload;
      state.showSuccess = action.payload?.mining_claim_points;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomePageDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      .addCase(getHomePageDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // daily code
      .addCase(sendDailyCodeThunk.fulfilled, (state, action) => {
        state.showSuccess = action.payload?.dailyCodePoint;
      })

      .addCase(sendDailyCodeThunk.rejected, (state, action) => {
        state.showSuccess = false;
      })

      // daily point
      .addCase(sendDailyPointThunk.fulfilled, (state, action) => {
        state.showSuccess = action.payload;
      })

      .addCase(sendDailyPointThunk.rejected, (state, action) => {
        state.showSuccess = false;
      });
  }
});

export const { setCloseSuccess, setUpdateHomeData } = homePageSlice.actions;

export default homePageSlice.reducer;
