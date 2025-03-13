import express from "express";
const router = express.Router();
import { getUserForSidebar } from "../controllers/Message.controller.js";
import { protectedRoute } from "../middleware/auth.middle.js";

router.get("/users", protectedRoute, getUserForSidebar);

export default router;
