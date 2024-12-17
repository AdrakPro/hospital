import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "@common/middlewares/errorMiddleware";
import mainRouter from "@/router";
import authRouter from "@common/auth/router";
import * as fs from "node:fs";
import * as https from "node:https";
import path from "path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json({ limit: "5kb" }));

app.use(authRouter);
app.use(mainRouter);

app.use(errorMiddleware);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

const privateKey = fs.readFileSync(path.resolve(__dirname, "https/server.key"), "utf8");
const certificate = fs.readFileSync(path.resolve(__dirname, "https/server.cert"), "utf8");
const credentials = { key: privateKey, cert: certificate };

const PORT = process.env.PORT || 3000;

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
