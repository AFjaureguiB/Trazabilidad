"use strict";

import { DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "./configEnv.js";
import { handleError } from "../utils/errorHandler.js";
import { Sequelize } from "sequelize";

// Create the connection to database
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_URL,
  dialect: "mysql",
  port: DB_PORT,
});

async function setupDB() {
  try {
    await sequelize.authenticate();
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}

export { setupDB };
export default sequelize;