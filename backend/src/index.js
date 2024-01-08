import { createServer } from "http";
import app from "./app.js";
import webSocket from "./mqttSocket.js";
import { sequelize } from "./database/database.js";
import "./models/User.js";
import "./models/Category.js";
import "./models/Hardware.js";
import "./models/Reading.js";
import "./models/Bill.js";
import "./models/Report.js";
import "dotenv/config";

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
