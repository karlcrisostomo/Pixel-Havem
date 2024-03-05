import { fetchDataFromPexels } from "@/api/requestManager";

export const requestHandler = async ({ query, setData }) => {
  try {
    const res = await fetchDataFromPexels(query);

    return setData(res);
  } catch (error) {
    console.error(error);
  }
};
