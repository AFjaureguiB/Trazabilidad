"use strict";

import { DataTypes } from "sequelize";

import sequelize from "../config/configDB.js";

const ChemicalTests = sequelize.define(
  "ChemicalTests",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    testedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pieceId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Piece",
        key: "id",
      },
    },
    sterilizationbatchId: {
      type: DataTypes.INTEGER,
      references: {
        model: "SterilizationBatch",
        key: "id",
      },
    },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "chemicaltests",
  }
);

export default ChemicalTests;
