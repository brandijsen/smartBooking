// src/controllers/category.controller.js
import { Category } from "../models/Category.js";
import fs from "fs";
import path from "path";
/**
 * 📋 GET /api/categories
 * Ritorna tutte le categorie
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error("❌ Errore getAllCategories:", err);
    res.status(500).json({ message: "Errore nel recupero delle categorie" });
  }
};

/**
 * 🔍 GET /api/categories/:id
 * Ritorna una categoria specifica
 */
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria non trovata" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error("❌ Errore getCategoryById:", err);
    res.status(500).json({ message: "Errore nel recupero della categoria" });
  }
};

/**
 * ➕ POST /api/categories
 * Crea una nuova categoria
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image_url = req.file
      ? `/uploads/categories/${req.file.filename}`
      : null;

    if (!name) {
      return res.status(400).json({ message: "Il nome è obbligatorio" });
    }

    const newCategory = await Category.create({ name, description, image_url });
    res.status(201).json({
      message: "Categoria creata con successo",
      category: newCategory,
    });
  } catch (err) {
    console.error("❌ Errore createCategory:", err);
    res.status(500).json({ message: "Errore nella creazione della categoria" });
  }
};

/**
 * ✏️ PUT /api/categories/:id
 * Aggiorna una categoria esistente
 */


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // 1️⃣ Recupera la categoria esistente
    const existing = await Category.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Categoria non trovata" });
    }

    // 2️⃣ Determina se è stata caricata una nuova immagine
    let image_url = existing.image_url; // di default, mantieni la vecchia

    if (req.file) {
      // 3️⃣ Se c’è una nuova immagine, salvala
      image_url = `/uploads/categories/${req.file.filename}`;

      // 4️⃣ Cancella la vecchia immagine dal disco
      if (existing.image_url) {
        const oldPath = path.join(process.cwd(), existing.image_url);
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.warn("⚠️ Impossibile eliminare l’immagine precedente:", err.message);
          } else {
            console.log("🧹 Vecchia immagine eliminata:", existing.image_url);
          }
        });
      }
    }

    // 5️⃣ Aggiorna i dati nel DB
    await Category.update(id, { name, description, image_url });

    res.status(200).json({
      message: "Categoria aggiornata con successo",
      image_url,
    });
  } catch (err) {
    console.error("❌ Errore updateCategory:", err);
    res.status(500).json({ message: "Errore nell'aggiornamento categoria" });
  }
};

/**
 * ❌ DELETE /api/categories/:id
 * Elimina una categoria
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Category.findById(id);

    if (!existing) {
      return res.status(404).json({ message: "Categoria non trovata" });
    }

    await Category.remove(id);
    res.status(200).json({ message: "Categoria eliminata con successo" });
  } catch (err) {
    console.error("❌ Errore deleteCategory:", err);
    res.status(500).json({ message: "Errore nell'eliminazione della categoria" });
  }
};
