"use strict";

import { SterilizationBatch, Piece } from "../models/index.js";
import { referencias } from "../constants/referencias.js";

// Filtrar y organizar las piezas por referencia
const groupPiecesByReference = (sterilizationBatches) => {
  const result = [];

  // Iterar sobre los lotes de esterilización aprobados
  sterilizationBatches.forEach((batch) => {
    batch.pieces.forEach((piece) => {
      const reference = piece.references;

      // Verificar si la referencia está en el objeto referencias
      if (referencias[reference]) {
        // Buscar si ya existe un grupo para esta referencia en el resultado
        const existingGroup = result.find(
          (group) => group.references === reference
        );

        if (existingGroup) {
          // Si ya existe, agregar la pieza al array de piezas
          existingGroup.pieces.push({
            id: piece.id,
            code: piece.code,
            references: piece.references,
            description: piece.description,
            tissueId: piece.tissueId,
            createdAt: piece.createdAt,
            updatedAt: piece.updatedAt,
          });

          // Incrementar el contador de cantidad
          existingGroup.quantity++;
        } else {
          // Si no existe, crear un nuevo grupo
          result.push({
            references: reference,
            quantity: 1,
            pieces: [
              {
                id: piece.id,
                code: piece.code,
                references: piece.references,
                description: piece.description,
                tissueId: piece.tissueId,
                createdAt: piece.createdAt,
                updatedAt: piece.updatedAt,
              },
            ],
          });
        }
      }
    });
  });

  return result;
};

async function getInventory() {
  try {
    const sterilizationBatchesFromDB = await SterilizationBatch.findAll({
      where: {
        status: "Aprobado",
      },
      include: [
        {
          model: Piece,
          as: "pieces",
          where: {
            shipmentId: null,
          },
        },
      ],
    });

    if (!sterilizationBatchesFromDB)
      return [null, "Error al obtener informacion para generar inventario"];

    if (sterilizationBatchesFromDB.length === 0)
      return [
        null,
        "No hay lotes de esterilizacon aprobados o piezas en el inventario",
      ];

    const inventory = groupPiecesByReference(sterilizationBatchesFromDB);
    return [inventory, null];
  } catch (error) {
    handleError(error, "inventory.service -> getInventory");
    return [null, "Error al obtener el inventario"];
  }
}

export default {
  getInventory,
};
