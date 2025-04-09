import { createAsyncThunk } from "@reduxjs/toolkit";
import { upgradeServicePost } from "./../../Commons/Services/upgradeService";
import { toast } from "react-toastify";

export const upgradeBuyThunk = createAsyncThunk(
  "post/buy/upgrade",
  async ({ obj, token }) => {
    try {
      const response = await upgradeServicePost({ obj, token });
      console.log(response, "this is buy native response");

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
