import { Op } from "sequelize";
import {
  Tissue,
  Piece,
  PieceBatch,
  ChemicalTests,
  SterilizationBatch,
  Shipment,
  InfectiousTests,
  Donor,
} from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";
import { updatePieceBatchStatusAccordingChemicalTests } from "./pieceBatch.service.js";
import { updateSterilizationBatchStatusAccordingChemicalTests } from "./sterilizationBatch.service.js";

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

async function addChemicalTestToPiece(
  pieceBatchId,
  sterilizationbatchId,
  pieceId,
  chemicalTest
) {
  try {
    const pieceFound = await Piece.findByPk(pieceId);
    if (!pieceFound) return [null, "La pieza no existe"];

    if (pieceBatchId) {
      const chemicalTestAdded = await pieceFound.createChemicalTest({
        ...chemicalTest,
        testedAt: new Date(),
      });

      const pieceBatchFound = await PieceBatch.findByPk(pieceBatchId, {
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

      if (!pieceBatchFound) return [null, "El lote de piezas no existe"];

      const chemicalTests = pieceBatchFound.pieces.flatMap((p) =>
        p.chemicalTests.slice(0, 1)
      );

      // Si alguna prueba es "No Aprobado", el estado es "rechazado"
      const status = chemicalTests.some((test) => test.result === "No Aprobado")
        ? "Rechazado"
        : chemicalTests.length === 3
        ? "Pre-Aprobado"
        : "";

      if (status) {
        pieceBatchFound.update({ status });
      }

      return [chemicalTestAdded.toJSON(), null];
    }

    if (sterilizationbatchId) {
      const chemicalTestAdded = await pieceFound.createChemicalTest({
        ...chemicalTest,
        testedAt: new Date(),
        sterilizationbatchId,
      });

      const sterilizationBatchFound = await SterilizationBatch.findByPk(
        sterilizationbatchId,
        {
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
        }
      );
      if (!sterilizationBatchFound)
        return [null, "El lote de esterilizacion no existe"];

      const chemicalTests = sterilizationBatchFound.pieces.flatMap((p) =>
        p.chemicalTests.slice(0, 1)
      );

      // Si alguna prueba es "No Aprobado", el estado es "rechazado"
      const status = chemicalTests.some((test) => test.result === "No Aprobado")
        ? "Rechazado"
        : chemicalTests.length === 11
        ? "Aprobado"
        : "";

      if (status) {
        sterilizationBatchFound.update({ status });
      }

      return [chemicalTestAdded.toJSON(), null];
    }
  } catch (error) {
    handleError(error, "piece.service -> addChemicalTestToPiece");
    return [null, "Error al crear la prueba quimica a la pieza"];
  }
}

//This should be in another file, p. ej. chemicasTest.services.js
async function updateChemicalTest(
  pieceBatchId,
  sterilizationbatchId,
  chemicalTestId,
  chemicalTest
) {
  try {
    const chemicalTestFound = await ChemicalTests.findByPk(chemicalTestId);
    if (!chemicalTestFound) return [null, "La prueba quimica no existe"];

    await chemicalTestFound.update(chemicalTest);
    await chemicalTestFound.reload();

    if (pieceBatchId)
      await updatePieceBatchStatusAccordingChemicalTests(pieceBatchId);

    if (sterilizationbatchId)
      await updateSterilizationBatchStatusAccordingChemicalTests(
        sterilizationbatchId
      );

    return [chemicalTestFound.toJSON(), null];
  } catch (error) {
    handleError(error, "piece.service -> updateChemicalTest");
    return [null, "Error al actualizar la prueba quimica a la pieza"];
  }
}

//trazabilidad
async function getTrazabilityPiecesInShipments() {
  try {
    const piecesInShipments = await Piece.findAll({
      where: {
        shipmentId: {
          [Op.not]: null, // Filtrar piezas que están en algún envío
        },
      },
      include: [
        {
          model: Tissue,
          as: "tissue",
          include: [
            {
              model: Donor,
            },
            {
              model: InfectiousTests, // Incluir las pruebas infecciosas de cada tejido
              as: "infectiousTests", // El alias que definiste en la relación
            },
          ],
        },
        {
          model: PieceBatch,
          as: "batches",
        },
        {
          model: SterilizationBatch,
          as: "sterilizationBatch",
        },
        {
          model: Shipment,
          as: "shipment", // Alias definido en la relación
        },
      ],
    });

    if (!piecesInShipments)
      return [null, "No logramos recuperar informacion las piezas"];

    const piecesInShipmentsMapped = piecesInShipments.map((p) => p.toJSON());

    return [piecesInShipmentsMapped, null];
  } catch (error) {
    handleError(error, "piece.service -> getPiecesInShipments");
    return [null, "Error al obtener informacion de las piezas"];
  }
}

export default {
  savePiece,
  updatePiece,
  getPiecesWithoutBatch,
  addChemicalTestToPiece,
  updateChemicalTest,
  getTrazabilityPiecesInShipments,
};
