import axios from "../services/root.service";

export const saveShipment = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.post("/shipment", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 201) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
