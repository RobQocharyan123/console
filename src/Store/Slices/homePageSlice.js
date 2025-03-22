import { createSlice } from "@reduxjs/toolkit";
import {
  getHomePageDataThunk,
  sendDailyCodeThunk,
  sendDailyPointThunk
} from "../Middlewares/homePageData";

const initialState = {
  homeData: {
    is_used_daily_code: true,
    is_used_daily_claim: true,
    total_balance: 2300,
    daily_claim_point: 100,
    user_mining_data: {
      boostSpeed: 1,
      upgradeSpeed: 1,
      blockPoint: 75,
      miningLeftSecond: 11265711,
      miningPoints: 365
    },
    booster: {
      upgrades: [
        {
          id: "2c45c457-42ea-4c71-91c7-e49de0a66ba4",
          speed: 1,
          point: 75,
          native_price: "0",
          ton_price: "0",
          level: "1",
          is_active: true,
          created_at: "2025-03-18T08:43:20.242Z",
          updated_at: "2025-03-18T08:43:20.242Z"
        }
      ],
      boosts: [
        {
          id: "265adfaf-1a9f-40c6-8ec9-81d0af282e7a",
          speed: 1,
          duration: 30,
          ton_price: "0",
          is_free: true,
          is_active: true,
          created_at: "2025-03-19T03:29:21.918Z",
          updated_at: "2025-03-19T03:29:21.918Z"
        }
      ],
      bot: {
        additionalProp1: {}
      }
    }
  },
  loading: false,
  showSuccess: false
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
