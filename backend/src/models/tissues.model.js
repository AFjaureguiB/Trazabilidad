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
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdfpath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "tissues",
    hooks: {
      afterCreate: async (tissue, options) => {
        const defaultTests = [
          "HB Core total",
          "HbgAg",
          "HCV",
          "Sífilis",
          "Chagas",
          "Citomegalovirus Igm",
          "HTLV 1-2",
          "HIV 1-2",
        ];

        // Crear las 8 pruebas infecciosas por defecto
        await Promise.all(
          defaultTests.map((testName) =>
            tissue.createInfectiousTest({
              testName,
              result: "No Realizado",
              testedAt: new Date(),
            })
          )
        );
      },
    },
  }
);

export default Tissue;
