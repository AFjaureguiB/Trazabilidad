"use strict";
import { DataTypes } from "sequelize";

import sequelize from "../config/configDB.js";

const Shipment = sequelize.define("Shipment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  receivingips: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sede: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receivername: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  patientname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientdni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialistname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  indication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Shipment;
