import express from "express";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import {
  getUserForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", ProtectRoute, getUserForSidebar);
router.post("/send/:id", ProtectRoute, sendMessage);
router.get("/user/:id", ProtectRoute, getMessages);

export default router;
