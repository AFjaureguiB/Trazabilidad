import axios from "../services/root.service";

export const getLogs = async () => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const response = await axios.get("/logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, data } = response;

    if (status === 200) {
      // Ajustando según si los logs vienen dentro de un objeto 'data'
      return data.data?.logs || data.logs;
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.response?.data?.message || "Error fetching logs",
      error: error.response?.data?.error || error.message,
    };
  }
};
