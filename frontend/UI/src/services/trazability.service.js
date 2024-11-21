import axios from "../services/root.service";

export const getTrazabilityPiecesInShipments = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.get("/pieces/trazability", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;
    if (status === 200) return data.data;
    if (status === 204) return [];
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
