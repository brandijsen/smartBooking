import { getPool } from "../config/db.js";

export const Service = {
  // 🔹 CREA nuovo servizio
  async create({ professional_id, category_id, name, description, price, duration, image_url }) {
    const pool = await getPool();
    const [result] = await pool.execute(
      `INSERT INTO services 
       (professional_id, category_id, name, description, price, duration, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [professional_id, category_id, name, description, price, duration, image_url]
    );
    return { id: result.insertId, name, description, price, duration, image_url };
  },

  // 🔹 TROVA tutti i servizi (join categorie)
  async findAll() {
    const pool = await getPool();
    const [rows] = await pool.execute(`
      SELECT s.*, c.name AS category_name
      FROM services s
      LEFT JOIN categories c ON s.category_id = c.id
      ORDER BY s.created_at DESC
    `);
    return rows;
  },

  // 🔹 TROVA servizio per ID
  async findById(id) {
    const pool = await getPool();
    const [rows] = await pool.execute(`
      SELECT s.*, c.name AS category_name
      FROM services s
      LEFT JOIN categories c ON s.category_id = c.id
      WHERE s.id = ?
    `, [id]);
    return rows[0];
  },

  // 🔹 AGGIORNA servizio
  async update(id, fields) {
    const pool = await getPool();
    const columns = Object.keys(fields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(fields), id];
    await pool.execute(`UPDATE services SET ${columns} WHERE id = ?`, values);
  },

  // 🔹 ELIMINA servizio
  async remove(id) {
    const pool = await getPool();
    await pool.execute("DELETE FROM services WHERE id = ?", [id]);
  }
};
