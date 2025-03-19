import { createAsyncThunk } from "@reduxjs/toolkit";

export const telegramLoginThunk = createAsyncThunk(
  "user/telegramLogin",
  async (authData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://your-backend-server.com/telegram-callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(authData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
