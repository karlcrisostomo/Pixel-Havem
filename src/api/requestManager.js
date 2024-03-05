// require("dotenv").config();
import axios from "axios";

const API_KEY = "SxVwj36R9BsWY0Lr82ZobidJmQShxScnA3G8nA6UNjYgI6Op45xnE6k6";

export const fetchDataFromPexels = async (apiUrl, mediaType) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (response.status === 200 && response.data[mediaType]) {
      return response.data[mediaType];
    } else {
      console.error(
        `Error fetching ${mediaType} data from Pexels API:`,
        response.statusText
      );
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${mediaType} data from Pexels API:`, error);
    return [];
  }
};
