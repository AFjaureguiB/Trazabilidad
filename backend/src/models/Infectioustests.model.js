"use strict";

import { DataTypes } from "sequelize";

import sequelize from "../config/configDB.js";

const InfectiousTests = sequelize.define(
  "InfectiousTests",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    testName: {
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
    tissueId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tissue",
        key: "id",
      },
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "infectioustests",
  }
);

export default InfectiousTests;
