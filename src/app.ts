import express, { Application, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173","https://mpair-task-frontend.vercel.app"], credentials: true }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the project - pure ledger backend");
});

export default app;
