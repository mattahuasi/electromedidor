import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  initialism: {
    type: DataTypes.STRING,
    unique: true,
  },
  minA: {
    type: DataTypes.INTEGER,
  },
  maxA: {
    type: DataTypes.INTEGER,
  },
  minB: {
    type: DataTypes.INTEGER,
  },
  maxB: {
    type: DataTypes.INTEGER,
  },
  minC: {
    type: DataTypes.INTEGER,
  },
  maxC: {
    type: DataTypes.INTEGER,
  },
  priceA: {
    type: DataTypes.FLOAT,
  },
  priceB: {
    type: DataTypes.FLOAT,
  },
  priceC: {
    type: DataTypes.FLOAT,
  },
});
