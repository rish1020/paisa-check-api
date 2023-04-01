import express, { Express, NextFunction, Request, Response } from "express";
import { registerControllers } from "./controllers";
import { ResponseEntity } from "./interfaces/ResponseEntity";
import { json } from "body-parser";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3030",
  })
);

app.use(json());
dotenvConfig();

import { registerDatabase } from "./db";
registerDatabase();

registerControllers(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const body: ResponseEntity = {
    ok: false,
    error: err.message,
  };
  res.send(body);
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}}`);
});
