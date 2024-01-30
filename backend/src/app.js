import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authEmployeeRoutes from "./routes/authEmployee.routes.js";
import authCustomerRoutes from "./routes/authCustomer.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import hardwareRoutes from "./routes/hardware.routes.js";
import readingRoutes from "./routes/reading.routes.js";
import billRoutes from "./routes/bill.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

app.set("appName", process.env.APP_NAME || "API");
app.set("port", process.env.APP_PORT || 3000);

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.ALLOWED_ORIGINS],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authEmployeeRoutes);
app.use("/api", authCustomerRoutes);
app.use("/api", employeeRoutes);
app.use("/api", customerRoutes);
app.use("/api", hardwareRoutes);
app.use("/api", readingRoutes);
app.use("/api", billRoutes);
app.use("/api", reportRoutes);

export default app;
