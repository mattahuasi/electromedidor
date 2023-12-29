import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();

app.set("appName", process.env.APP_NAME || "SPA");
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

export default app;
