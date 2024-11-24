import axios from "../services/root.service";

export const getDispatchPDF = async (shipment) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;
    const response = await axios.post(
      "/dispatch-pdf",
      { shipment },
      {
        responseType: "blob", // Asegura que recibimos un blob (PDF) como respuesta
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Crear un blob a partir de la respuesta
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Crear una URL para el blob
    const url = window.URL.createObjectURL(blob);

    // Abrir el PDF en una nueva ventana
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error al abrir el PDF:", error);
  }
};
