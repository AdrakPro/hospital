import express from "express";
import { errorMiddleware } from "@common/middlewares/errorMiddleware";
import mainRouter from "@/router";

const app = express();

app.use(express.json({ limit: "5kb" }));

app.use(mainRouter);

app.use(errorMiddleware);

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
