import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { deleteAccount } from "../controllers/user.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);

// ✅ Endpoint per cancellare il proprio account
router.delete("/me", verifyToken, deleteAccount);

export default router;
