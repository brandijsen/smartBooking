import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/test", verifyToken, isAdmin, (req, res) => {
  res.json({ message: `Welcome admin ${req.user.email}!` });
});

export default router;
