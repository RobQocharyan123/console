import { createSlice } from "@reduxjs/toolkit";
import { getHomePageDataThunk } from "../Middlewares/homePageData";

const initialState = {
  homeData: null,
  loading: false,

};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
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
      })
      .addCase(getHomePageDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// export const { } =  homePageSlice.actions;

export default homePageSlice.reducer;
