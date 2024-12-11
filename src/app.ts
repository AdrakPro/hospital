import express from "express";
import personRouter from "@person/router";
import * as process from "node:process";

const app = express();

app.use("/api", personRouter);

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
