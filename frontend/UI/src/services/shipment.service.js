import axios from "../services/root.service";

export const getShipments = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.get("/shipment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    if (status === 200) return data;
    if (status === 204) return { state: "Success", data: [] };
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

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
