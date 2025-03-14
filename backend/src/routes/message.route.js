import express from "express";
const router = express.Router();
import {
  getUserForSidebar,
  sendMessage,
  getMessage,
} from "../controllers/Message.controller.js";
import { protectedRoute } from "../middleware/auth.middle.js";

router.get("/users", protectedRoute, getUserForSidebar);
router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
