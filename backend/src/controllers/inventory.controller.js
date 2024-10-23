"use strict";
import inventoryService from "../services/inventory.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function getInventory(req, res) {
  try {
    const [inventroy, inventoryError] = await inventoryService.getInventory();
    if (inventoryError) return respondError(req, res, 404, inventoryError);
    inventroy.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, inventroy);
  } catch (error) {
    handleError(error, "inventory.controller -> getInventory");
    respondError(req, res, 400, error.message);
  }
}

export default {
  getInventory,
};
