import { getPool } from "../config/db.js";

export const ServiceImage = {
  // 🔹 AGGIUNGE immagine a un servizio
  async create({ service_id, image_url }) {
    const pool = await getPool();
    const [result] = await pool.execute(
      "INSERT INTO service_images (service_id, image_url) VALUES (?, ?)",
      [service_id, image_url]
    );
    return { id: result.insertId, service_id, image_url };
  },

  // 🔹 TROVA tutte le immagini di un servizio
  async findByService(service_id) {
    const pool = await getPool();
    const [rows] = await pool.execute(
      "SELECT * FROM service_images WHERE service_id = ?",
      [service_id]
    );
    return rows;
  },

  // 🔹 ELIMINA immagine
  async remove(id) {
    const pool = await getPool();
    await pool.execute("DELETE FROM service_images WHERE id = ?", [id]);
  }
};
