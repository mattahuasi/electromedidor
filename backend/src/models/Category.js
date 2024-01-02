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
  priceA: {
    type: DataTypes.FLOAT,
  },
  minB: {
    type: DataTypes.INTEGER,
  },
  maxB: {
    type: DataTypes.INTEGER,
  },
  priceB: {
    type: DataTypes.FLOAT,
  },
  minC: {
    type: DataTypes.INTEGER,
  },
  maxC: {
    type: DataTypes.INTEGER,
  },
  priceC: {
    type: DataTypes.FLOAT,
  },
});
