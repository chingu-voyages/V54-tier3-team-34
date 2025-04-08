import { Router } from "express";
import { createConversation } from "./controller.js";

const conversationsRouter = Router();

conversationsRouter.post("/", createConversation);

export default conversationsRouter;
