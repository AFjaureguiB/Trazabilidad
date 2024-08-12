"use strict";

import { DataTypes } from "sequelize";

import sequelize from "../config/configDB.js";

const Tissue = sequelize.define(
  "Tissue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ips: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialistname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collectedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tissuetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Donor",
        key: "id",
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "tissues",
  }
);

export default Tissue;
