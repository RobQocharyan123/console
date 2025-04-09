import pureClient from ".";

export const boostData = async (token) => {
  try {
    const response = await pureClient.post(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from /boost:", error);
  }
};
