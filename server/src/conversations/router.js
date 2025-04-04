import { Router } from "express";
import { createConversation } from "./controllers.js";

const conversationsRouter = Router();

conversationsRouter.post("/", createConversation);

export default conversationsRouter;
