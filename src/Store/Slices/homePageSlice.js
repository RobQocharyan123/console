import { createSlice } from "@reduxjs/toolkit";
import {
  getHomePageDataThunk,
  sendDailyCodeThunk,
  sendDailyPointThunk
} from "../Middlewares/homePageData";

const initialState = {
  homeData: [],
  loading: false,
  showSuccess: false,
  token: ""
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setCloseSuccess: (state) => {
      state.showSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
        state.token = action.payload?.token;
      })
      .addCase(getHomePageDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // daily code
      .addCase(sendDailyCodeThunk.fulfilled, (state, action) => {
        state.showSuccess = action.payload;
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

export const { setCloseSuccess } = homePageSlice.actions;

export default homePageSlice.reducer;
