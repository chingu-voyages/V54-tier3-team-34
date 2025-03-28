import express from "express";

const app = express();

app.use(function logRequests(req, _, next) {
  console.info(`${req.method} initiated on ${req.path}`);
  next();
});

export default app;
