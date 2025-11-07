import { getPool } from "../config/db.js";
import bcrypt from "bcryptjs";

export const User = {
  // 🔹 crea nuovo utente
  async create({ name, email, password, role = "customer" }) {
    const pool = await getPool();
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role]
    );
    return { id: result.insertId, name, email, role };
  },

   async findById(id) {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  // 🔹 cerca utente per email
  async findByEmail(email) {
    const pool = await getPool();
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
};
