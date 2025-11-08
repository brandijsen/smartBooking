import { getPool } from "../config/db.js";

export const Category = {
  // 🔹 CREA nuova categoria
  async create({ name, description, image_url }) {
    const pool = await getPool();
    const [result] = await pool.execute(
      "INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)",
      [name, description, image_url]
    );
    return { id: result.insertId, name, description, image_url };
  },

  // 🔹 TROVA tutte le categorie
  async findAll() {
    const pool = await getPool();
    const [rows] = await pool.execute("SELECT * FROM categories ORDER BY name ASC");
    return rows;
  },

  // 🔹 TROVA categoria per ID
  async findById(id) {
    const pool = await getPool();
    const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  },

  // 🔹 AGGIORNA categoria
  async update(id, { name, description, image_url }) {
    const pool = await getPool();
    await pool.execute(
      "UPDATE categories SET name = ?, description = ?, image_url = ? WHERE id = ?",
      [name, description, image_url, id]
    );
  },

  // 🔹 ELIMINA categoria
  async remove(id) {
    const pool = await getPool();
    await pool.execute("DELETE FROM categories WHERE id = ?", [id]);
  }
};
