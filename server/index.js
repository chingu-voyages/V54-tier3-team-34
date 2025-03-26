import { createServer } from "node:http";
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
