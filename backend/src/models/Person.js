import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Person = sequelize.define("people", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  ci: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export const Customer = sequelize.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

Person.hasOne(User, {
  foreignKey: "personId",
  sourceKey: "id",
});

User.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});

Person.hasOne(Customer, {
  foreignKey: "personId",
  sourceKey: "id",
});

Customer.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
