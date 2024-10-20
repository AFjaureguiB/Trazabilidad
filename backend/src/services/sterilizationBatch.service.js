"use strict";
import {
  SterilizationBatch,
  Piece,
  ChemicalTests,
  PieceBatch,
} from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

async function createSterilizationBatch(piecesBatchesIds, batchData) {
  try {
    //Si no es posible obtener todas las referencias de los lotes de piezas, entonces no podre
    //agregar todas las piezas al nuevo lote de esterilizacion y quedara incompleto
    const pieceBatchCount = await PieceBatch.count({
      where: {
        id: piecesBatchesIds,
      },
    });

    //Retorno un error y no creo el lote para que no quede incompleto
    if (pieceBatchCount < piecesBatchesIds.length)
      return [null, "Error al recuperar todas las piezas para el nuevo lote"];

    //recuperare todas las piezas involucradas en cada uno de los tres lotes de piezas
    //Para que estas sean las que se agreguen al nuevo lote de esterilizacion
    //para este punto tengo asegurado que podre recuperar piezas de tres lotes y que el
    //nuevo lote de esterilizacion no quedara con piezas de solo 1 o 2 lotes.
    const piecesInBatches = await Piece.findAll({
      include: [
        {
          model: PieceBatch,
          as: "batches",
          where: { id: piecesBatchesIds },
          through: { attributes: [] },
        },
      ],
    });

    //obtengo un array de todas las piezas involucradas para validar mas adelante
    const pieceIds = piecesInBatches.map((piece) => piece.id);
    /*
      Voy a verificar si alguna de las piezas que voy a agregar a un nuevo lote de esterilizacion
      existe previamente ya en un lote de esterilizacion creado. 
      Esto se realiza para evitar el caso en el que el usuario haga lo siguiente: 
      De los lotes de piezas con numero [4,5,6], crear un nuevo lote de esterilizacion, con numero X asignado por la DB.
      De los lotes de peizas con numero [5,6,7], crear un nuevo lote de esterilizacion, con numero X asignado por la DB.

      En el caso anterior, las piezas del lote de piezas con numero [5], quedarian duplicadas en ambos lotes de esterilizacion, lo cual no es correcto.
    */
    const piecesCount = await Piece.count({
      where: {
        id: pieceIds, // IDs de las piezas que tienes
      },
      include: [
        {
          model: SterilizationBatch,
          as: "sterilizationBatch", // Alias en la relación
          required: true,
          through: { attributes: [] }, // Omite la tabla de unión
        },
      ],
    });

    if (piecesCount > 0)
      return [
        null,
        "Error al crear el lote de esterilizacion, verifica la informacion de los lotes previos",
      ];

    const newStBatch = await SterilizationBatch.create(batchData);

    if (!newStBatch) return [null, "Error al crear el nuevo lote"];

    await newStBatch.addPieces(piecesInBatches);

    const newStBatchResponse = {
      ...newStBatch.toJSON(),
      totalPieces: piecesInBatches.length,
    };

    return [newStBatchResponse, null];
  } catch (error) {
    handleError(
      error,
      "sterilizationBatch.service -> createSterilizationBatche"
    );
    return [
      null,
      "Error al crear el lote de esterilizacion, verifica la informacion de los lotes previos",
    ];
  }
}

async function getSterilizationBatches() {
  try {
    const sterilizationBatchesFromDB = await SterilizationBatch.findAll({
      include: [
        {
          model: Piece,
          as: "pieces",
          include: [
            {
              model: ChemicalTests,
              as: "chemicalTests",
            },
          ],
        },
      ],
    });
    if (!sterilizationBatchesFromDB)
      return [null, "No hay informacion de lotes de esterilizacion"];

    const sterilizationBatches = sterilizationBatchesFromDB.map((sb) =>
      sb.toJSON()
    );

    return [sterilizationBatches, null];
  } catch (error) {
    handleError(error, "sterilizationBatch.service -> getSterilizationBatches");

    return [null, "Error al obtener lotes de esterilizacion"];
  }
}

async function updateSterilizationBatch(id, sterilizationBatchData) {
  try {
    const sterilizationBatchFound = await SterilizationBatch.findByPk(id);

    if (!sterilizationBatchFound) return [null, "El lote no existe"];

    await sterilizationBatchFound.update(sterilizationBatchData);
    await sterilizationBatchFound.reload();

    return [sterilizationBatchFound.toJSON(), null];
  } catch (error) {
    handleError(
      error,
      "sterilizationBatch.service -> updateSterilizationBatch"
    );

    return [null, "Error al actualizar el lote de piezas"];
  }
}
export default {
  getSterilizationBatches,
  createSterilizationBatch,
  updateSterilizationBatch,
};
