"use strict";
import PieceService from "../services/piece.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function savePiece(req, res) {
  try {
    const { body } = req;
    console.log(body);
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

export default {
  savePiece,
};
