import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import customerRoutes from "./routes/customer.routes.js";
// import categoryRoutes from "./routes/category.routes.js";
import hardwareRoutes from "./routes/hardware.routes.js";
import readingRoutes from "./routes/reading.routes.js";

const app = express();

app.set("appName", process.env.APP_NAME || "API");
app.set("port", process.env.APP_PORT || 3000);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", employeeRoutes);
app.use("/api", customerRoutes);
// app.use("/api", categoryRoutes);
app.use("/api", hardwareRoutes);
app.use("/api", readingRoutes);

export default app;
