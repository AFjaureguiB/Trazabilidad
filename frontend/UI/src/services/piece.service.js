import axios from "../services/root.service";

export const savePiece = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const code = `${payload.code}-${payload.letter}`;
    const pieceData = {
      tissueId: payload.tissueId,
      code,
      references: payload.references,
      description: payload.description,
    };

    const response = await axios.post("/pieces", pieceData, {
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
