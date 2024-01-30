import Sequelize from "sequelize";
import "dotenv/config";

// Conexión a una base de datos PostgreSQL local
export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    timezone: process.env.DB_TIMEZONE,
  }
);

// Conexión local a una base de datos PostgreSQL de en linea
// export const sequelize = new Sequelize(process.env.DB_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// Conexión a la base de datos en linea PostgreSQL en producción
// export const sequelize = new Sequelize(process.env.DB_URL);

sequelize.options.logging = false;
