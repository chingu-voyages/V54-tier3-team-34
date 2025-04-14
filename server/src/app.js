import express from "express";
import conversationsRouter from "./conversations/router.js";

const app = express();

app.use(function logRequests(req, _, next) {
  console.info(`${req.method} initiated on ${req.path}`);
  next();
});

app.use(express.json());

app.use("/api/v1/conversations", conversationsRouter);

export default app;
