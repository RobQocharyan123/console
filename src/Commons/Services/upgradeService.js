import pureClient from ".";
import { toast } from "react-toastify";

export const upgradeServicePost = async ({ obj, token }) => {
  console.log("Token being sent:", token);
  try {
    const response = await pureClient.post("user/buy/upgrade", obj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (err) {
    const message = err?.response?.data?.msg || "An unexpected error occurred";
    toast.error(message);
    console.error("Error", err);
  }
};
