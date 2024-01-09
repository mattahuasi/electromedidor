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

import { User, Employee } from "./models/User.js";
import bcrypt from "bcryptjs";

async function main() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
    const user = await Employee.findOne({ include: { model: User } });
    if (!user) {
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newUser = await User.create({
        firstName: process.env.ADMIN_FIRSTNAME,
        lastName: process.env.ADMIN_LASTNAME,
        ci: "10000000",
        phone: "",
        email: process.env.ADMIN_EMAIL,
        password: passwordHash,
      });
      const newEmployee = await Employee.create({
        staff: true,
        admin: true,
        userId: newUser.id,
      });
      console.log("Admin was created successfully");
    }
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
