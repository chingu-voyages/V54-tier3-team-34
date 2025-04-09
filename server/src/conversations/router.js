import { Router } from "express";
import { createConversation, getConversation } from "./controller.js";

const conversationsRouter = Router();

conversationsRouter.post("/", createConversation);
conversationsRouter.get("/:hash", getConversation);

export default conversationsRouter;
