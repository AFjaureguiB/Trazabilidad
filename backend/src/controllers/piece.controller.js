"use strict";
import PieceService from "../services/piece.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function savePiece(req, res) {
  try {
    const { body } = req;
    const { tissueId, ...piece } = body;

    //TODO: Validar con un schema de Joi o Zod el cuerpo de la request

    const [newPiece, newPieceError] = await PieceService.savePiece(
      tissueId,
      piece
    );

    if (newPieceError) return respondError(req, res, 400, newPieceError);

    if (!newPiece) return respondError(req, res, 400, "No se creo la pieza");

    respondSuccess(req, res, 201, newPiece);
  } catch (error) {
    handleError(error, "piece.controller -> savePiece");
    respondError(req, res, 400, error.message);
  }
}

async function updatePiece(req, res) {
  try {
    const { id, ...pieceData } = req.body;

    //TODO: Validar con un schema de Joi o Zod el cuerpo de la request

    const [updatedPiece, updatedPieceError] = await PieceService.updatePiece(
      id,
      pieceData
    );

    if (updatedPieceError)
      return respondError(req, res, 400, updatedPieceError);
    if (!updatedPiece)
      return respondError(req, res, 400, "No se actualizo la pieza");

    respondSuccess(req, res, 200, updatedPiece);
  } catch (error) {
    handleError(error, "piece.controller -> updatePiece");
    respondError(req, res, 400, error.message);
  }
}

export default {
  savePiece,
  updatePiece,
};
