import Sequelize from "sequelize";
import "dotenv/config";

// export const sequelize = new Sequelize(process.env.DB_URL);

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true, // Opciones de SSL específicas de Sequelize
      rejectUnauthorized: false, // Podría ser necesario en algunos casos, depende de la configuración de Render
    },
  },
});

sequelize.options.logging = false;
