import { Router } from "express";
import { createPrompt } from "./controller.js";

const promptsRouter = Router({ mergeParams: true });
promptsRouter.post("/", createPrompt);

export default promptsRouter;
