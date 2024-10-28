"use strict";
import shipmentService from "../services/shipment.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function getShipments(req, res) {
  try {
    const [shipments, shipmentsError] = await shipmentService.getShipments();
    if (shipmentsError) return respondError(req, res, 400, shipmentsError);

    if (!shipments)
      return respondError(req, res, 400, "Error al obtener los envios");

    shipments.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, shipments);
  } catch (error) {
    handleError(error, "shipment.controller -> getShipments");
    respondError(req, res, 400, error.message);
  }
}

async function saveShipment(req, res) {
  try {
    console.log(req.body);

    const { pieces, ...shipmentData } = req.body;

    const pieceIds = pieces
      .flatMap((piece) => piece.ids)
      .map((id) => Number(id));

    const [newShipment, newShipmentError] = await shipmentService.saveShipment(
      pieceIds,
      shipmentData
    );

    if (newShipmentError) return respondError(req, res, 400, newShipmentError);

    if (!newShipment) return respondError(req, res, 400, "No se creo el envio");

    respondSuccess(req, res, 201, newShipment);
  } catch (error) {
    handleError(error, "shipment.controller -> saveShipment");
    respondError(req, res, 400, error.message);
  }
}

export default {
  saveShipment,
  getShipments,
};
