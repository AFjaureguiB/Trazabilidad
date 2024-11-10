import { Shipment, Piece } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

async function getShipments() {
  try {
    const shipmentsFromDB = await Shipment.findAll({
      include: [{ model: Piece, as: "pieces" }],
    });

    if (!shipmentsFromDB) return [null, "No logramos recuperar los envios"];

    const shipments = shipmentsFromDB.map((shipment) => shipment.toJSON());
    return [shipments, null];
  } catch (error) {
    handleError(error, "shipment.service -> getShipments");

    return [null, "Error al obtener los envios"];
  }
}

async function saveShipment(pieceIds, shipmentData) {
  try {
    const piecesToShip = await Piece.findAll({
      where: {
        id: pieceIds,
      },
    });

    if (piecesToShip.length !== pieceIds.length)
      return [null, "No se encontraron todas la piezas para el envio"];

    const newShipment = await Shipment.create(shipmentData);

    await newShipment.addPieces(piecesToShip);

    return [newShipment.toJSON(), null];
  } catch (error) {
    handleError(error, "shipment.service -> saveShipment");

    return [null, "Error al crear el envio"];
  }
}

async function updateShipment(id, shipmentData) {
  try {
    const shipmentFound = await Shipment.findByPk(id);
    if (!shipmentFound) return [null, "El envio no existe"];

    await shipmentFound.update(shipmentData);
    await shipmentFound.reload();

    return [shipmentFound.toJSON(), null];
  } catch (error) {
    handleError(error, "shipment.service -> updateShipment");

    return [null, "Error al actualizar el envio"];
  }
}
export default { saveShipment, getShipments, updateShipment };
