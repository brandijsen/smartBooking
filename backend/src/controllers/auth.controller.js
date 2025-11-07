import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mailer.js"; // lo creeremo dopo
import { getPool } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role: "customer" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verifyLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

    await sendVerificationEmail(email, name, verifyLink);

    res.status(201).json({ message: "Registration successful, verify your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Missing token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const pool = await getPool();
    await pool.execute("UPDATE users SET is_verified = 1 WHERE email = ?", [decoded.email]);

    res.send("✅ Email verificata con successo! Puoi ora effettuare il login.");
  } catch (err) {
    res.status(400).send("❌ Link non valido o scaduto.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: "Invalid credentials" });
if (!user.is_verified)
  return res.status(403).json({ message: "Please verify your email before logging in." });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


