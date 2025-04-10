import { Router } from "express";
import { createPrompt, deletePrompt } from "./controller.js";

const promptsRouter = Router({ mergeParams: true });

promptsRouter.post("/", createPrompt);
promptsRouter.delete("/:id", deletePrompt);

export default promptsRouter;
