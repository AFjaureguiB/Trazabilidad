"use strict";

import sequelize from "../config/configDB.js";
import { DataTypes } from "sequelize";

const Process = sequelize.define(
  "Process",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    maxusers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "processes",
  }
);

export default Process;
