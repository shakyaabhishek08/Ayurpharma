import express from "express";
import { askLLM, askML } from "../controllers/modelController.js";

const router = express.Router();

router.post("/llm", askLLM);
router.post("/ml", askML);

export default router;
