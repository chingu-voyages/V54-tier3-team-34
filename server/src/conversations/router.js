import { Router } from "express";
import { createConversation, getConversation } from "./controller.js";
import promptsRouter from "../prompts/router.js";

const conversationsRouter = Router();
conversationsRouter.use("/:hash/prompts", promptsRouter);

conversationsRouter.post("/", createConversation);
conversationsRouter.get("/:hash", getConversation);

export default conversationsRouter;
