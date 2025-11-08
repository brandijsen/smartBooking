// src/routes/category.routes.js
import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { upload } from "../middlewares/upload.js"; // gestione immagini
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js"; 

const router = express.Router();

/**
 * 📦 CATEGORIES ROUTES
 * Base path: /api/categories
 */

// 📋 GET tutte le categorie (pubblica)
router.get("/", getAllCategories);

// 🔍 GET singola categoria (pubblica)
router.get("/:id", getCategoryById);

// ➕ CREA nuova categoria (solo admin o staff)
// ➕ CREA categoria
router.post("/", verifyToken, isAdmin, upload.single("image"), createCategory);

// ✏️ UPDATE categoria
router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateCategory);

// ❌ DELETE categoria
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;
