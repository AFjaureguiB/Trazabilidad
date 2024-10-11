import { Tissue, Piece, PieceBatch } from "../models/index.js";

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

async function updatePiece(id, pieceData) {
  try {
    const pieceFound = await Piece.findByPk(id);
    if (!pieceFound) return [null, "La pieza no existe"];

    await pieceFound.update(pieceData);
    await pieceFound.reload();

    return [pieceFound.toJSON(), null];
  } catch (error) {
    handleError(error, "piece.service -> updatePiece");
    return [null, "Error al actuializar la pieza"];
  }
}

async function getPiecesWithoutBatch() {
  try {
    const piezasSinLoteFromDB = await Piece.findAll({
      include: [
        {
          model: PieceBatch,
          as: "batches",
          required: false,
        },
      ],
      where: {
        "$batches.id$": null,
      },
    });
    if (!piezasSinLoteFromDB)
      return [null, "No logramos recuperar las piezas sin lote"];

    const piezasSinLote = piezasSinLoteFromDB.map((p) => p.toJSON());

    return [piezasSinLote, null];
  } catch (error) {
    handleError(error, "piece.service -> getPiecesWithoutBatch");
    return [null, "Error al recuperar piezas sin lote"];
  }
}

export default {
  savePiece,
  updatePiece,
  getPiecesWithoutBatch,
};
