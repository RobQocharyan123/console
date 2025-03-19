import pureClient from ".";

export const homePageGetData = async () => {
  try {
    const response = await pureClient.get(`/telegram`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from /telegram:", error);
    throw error;
  }
};
