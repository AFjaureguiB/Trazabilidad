import { Tissue, Piece } from "../models/index.js";

export async function existPieceWithCode(code) {
  const pieceCount = await Piece.count({
    where: { code },
  });
  return pieceCount > 0;
}

async function savePiece(tissueId, piece) {
  try {
    const tissue = await Tissue.findByPk(tissueId);

    if (!tissue)
      return [null, "Error al recuperar el tejido para crear la pieza"];

    const pieceExist = await existPieceWithCode(piece.code);
    if (pieceExist) return [null, "Ya existe una pieza con ese codigo"];

    const newPiece = await tissue.createPiece(piece);

    return [newPiece.toJSON(), null];
  } catch (error) {
    handleError(error, "piece.service -> savePiece");

    return [null, "Error al crear la pieza"];
  }
}

export default {
  savePiece,
};
