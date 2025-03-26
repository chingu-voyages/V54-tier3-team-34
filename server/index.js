import { createServer } from "node:http"
import app from './src/app.js'

const PORT = 3000
createServer(app).listen(PORT, () => {
    console.info(`server has started listening on port ${PORT}`);
});  