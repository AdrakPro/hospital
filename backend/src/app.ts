import express from "express";
import personRouter from "@person/router";
import * as process from "node:process";
import { errorMiddleware } from "@common/middlewares/errorMiddleware";

const app = express();

app.use("/api", personRouter);

app.use(express.json());

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
