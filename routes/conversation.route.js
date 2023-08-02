import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getConversation,
  createConversation,
  getSingleConversation,
  updateConversation,
} from "../controllers/coversation.controller.js";

const router = express.Router();

router.get("/", verifyToken, getConversation);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
