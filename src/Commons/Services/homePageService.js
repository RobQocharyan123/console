import axios from "axios";
import pureClient from ".";

if (typeof window.Telegram === "undefined") {
  window.Telegram = {
    WebApp: {
      expand: () => {},
      initDataUnsafe: {
        user: {
          id: "12345",
          first_name: "John",
          last_name: "Doe",
          username: "john_doe",
          language_code: "en",
        },
      },
    },
  };
  console.log("Mocked Telegram WebApp for testing.");
}

export const loginPostUserData = async (userData) => {
  if (!userData){
    alert(4)
  };
  try {
    const response = await axios.post("https://your-backend.com/api/user-info", {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name || "",
      username: userData.username || "",
      language: userData.language_code,
    });

    console.log("User info sent successfully:", response.data);
    
  } catch (err) {
    console.error("Error sending user info:", err);
  }
};


export const homePageGetData = async () => {
  try {
    const response = await pureClient.get(`/telegram`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from /telegram:", error);
    throw error;
  }
};


