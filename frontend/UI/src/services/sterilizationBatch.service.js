import axios from "../services/root.service";

export const getSterilizationBatches = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.get("/sterilization-batches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 200) return data;
    if (status === 204) return [];
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
