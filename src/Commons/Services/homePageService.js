import axios from "axios";
import pureClient from ".";

if (typeof window.Telegram === "undefined") {
  window.Telegram = {
    WebApp: {
      expand: () => {},
      initDataUnsafe: {
        user: {
          id: 1802368420, // Replace with actual user ID
          first_name: "Poghos", // Replace with actual first name
          last_name: "Poghosyan", // Replace with actual last name
          username: "Poghos_kkk", // Replace with actual username
          language_code: "en", // Replace with actual language code
          photo_url: "https://t.me/i/userpic/320/R6kP81fplPdhuT-LUfFQPEUXqqKPrvaTLmqSgpUeMfc.jpg", // Replace with actual photo URL
          hash: "5a8d270dc0vjd26ebdbe32de91e75c919061b93bef51726e6077938f766d5143",
        },
      },
    },
  };
  console.log("Mocked Telegram WebApp for testing.");
}


export const loginPostUserData = async (userData) => {
  if (!userData) {
    console.log("User data is missing!");
    return;
  }

  try {
    const response = await axios.post("https://your-backend.com/api/user-info", {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name || "",
      username: userData.username || "",
      language: userData.language_code,
      photo_url: userData.photo_url || "", // Sending photo_url if available
      hash: userData.hash || "",
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


