import { createServer } from "http";
import app from "./app.js";
import webSocket from "./webSocket.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
    const server = createServer(app);
    webSocket(server);
    server.listen(app.get("port"), () => {
      console.log(`Server listening on port ${app.get("port")}.`);
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

main();
