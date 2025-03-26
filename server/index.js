import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

// allows BE and FE to be deployed together
// by serving the client's dist files using our server
if (process.env.NODE_ENV == "production") {
  const staticDir = fileURLToPath(new URL("../client/dist", import.meta.url));
  app.use(express.static(staticDir));

  app.get("*", function serveStaticFiles(_, res) {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

import app from "./src/app.js";

const PORT = process.env.PORT;
if (PORT === undefined) {
  throw new Error(
    "error finding PORT in env vars. setup .env.local following the documentation inside .env",
  );
}

createServer(app).listen(PORT, () => {
  console.info(`server has started listening on port ${PORT}`);
});
