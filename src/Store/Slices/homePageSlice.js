import { createSlice } from "@reduxjs/toolkit";
import { upgradeBuyThunk } from "./../Middlewares/upgradeServiceBuy";
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
      const { user_mining_data, total_balance, mining_claim_points } =
        action.payload || {};

      if (state.homeData) {
        if (user_mining_data) {
          state.homeData.user_mining_data = user_mining_data;
        }

        if (typeof total_balance !== "undefined") {
          state.homeData.total_balance = total_balance;
        }
      }

      if (typeof mining_claim_points !== "undefined") {
        state.showSuccess = mining_claim_points;
      }
    },

    setUpdateUbgradeData: (state, action) => {
      if (state.homeData.booster.upgrades) {
        state.homeData.booster.upgrades = action.payload?.upgrades;
        state.homeData.total_balance = action.payload?.total_balance;
      }
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
        state.showSuccess = action.payload?.initial_point;
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

    // .addCase(upgradeBuyThunk.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(upgradeBuyThunk.fulfilled, (state, action) => {
    //   if (state.homeData.booster.upgrades) {
    //     state.homeData.booster.upgrades = action.payload?.upgrades;
    //     state.homeData.total_balance = action.payload?.total_balance;
    //   }
    //   state.loading = false;
    // })
    // .addCase(upgradeBuyThunk.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  }
});

export const { setCloseSuccess, setUpdateHomeData, setUpdateUbgradeData } =
  homePageSlice.actions;

export default homePageSlice.reducer;
