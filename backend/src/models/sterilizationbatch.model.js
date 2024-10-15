"use strict";

import { DataTypes } from "sequelize";

import sequelize from "../config/configDB.js";

const SterilizationBatch = sequelize.define(
  "SterilizationBatch",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "sterilizationbatch" }
);
export default SterilizationBatch;
