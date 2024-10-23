import axios from "../services/root.service";

export const getInventory = async () => {
  try {
    const response = await axios.get("/inventory");
    const { status, data } = response;
    if (status === 204) return { state: "Success", data: [] };
    if (status === 200) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
