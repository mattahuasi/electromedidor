import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Customer } from "./Person.js";
import { Category } from "./Category.js";

export const Hardware = sequelize.define("hardware", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mack: {
    type: DataTypes.STRING,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
  },
  key: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  urban: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rural: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Customer.hasMany(Hardware, {
  foreignKey: "customerId",
  sourceKey: "id",
});

Hardware.belongsTo(Customer, {
  foreignKey: "customerId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});

Category.hasMany(Hardware, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

Hardware.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
