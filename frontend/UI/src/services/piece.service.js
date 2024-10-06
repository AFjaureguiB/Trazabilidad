import axios from "../services/root.service";
import { referencias } from "../constants/referencias";

export const savePiece = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const code = `${payload.code}-${payload.letter}`;
    const description = referencias[payload.references];
    const pieceData = {
      tissueId: payload.tissueId,
      code,
      references: payload.references,
      description,
    };
    console.log(pieceData);
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

export const updatePiece = async (payload) => {
  try {
    const token = localStorage.getItem("accestkn");
    if (!token) return;

    const code = `${payload.code}-${payload.letter}`;
    const description = referencias[payload.references];

    const pieceData = {
      id: payload.id,
      code,
      references: payload.references,
      description,
    };

    console.log(pieceData);

    const response = await axios.put("/pieces", pieceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    if (status === 200) return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
