import { createSlice } from "@reduxjs/toolkit";
import { telegramLoginThunk } from "../Middlewares/telegramLoginMIdleware";

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  lastActivity: Date.now()
};

const telegramLoginSLice = createSlice({
  name: "telegramLogin",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isSuccess = true;
      state.lastActivity = Date.now();
    },
    resetUserState: (state) => {
      state.userData = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.lastActivity = Date.now();
    },
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(telegramLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(telegramLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(telegramLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload;
      });
  }
});

export const { setUserData, resetUserState, updateActivity } =
  telegramLoginSLice.actions;

export default telegramLoginSLice.reducer;
