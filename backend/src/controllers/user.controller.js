import { getPool } from "../config/db.js";
import { sendGenericEmail  } from "../utils/mailer.js"; // riutilizziamo lo stesso transporter
import { User } from "../models/User.js";




export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Rimuoviamo la password dalla risposta
    const { password, ...userData } = user;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ Cancellazione volontaria dell'account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const userName = req.user.name || "utente";

    const pool = await getPool();
    await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

    // ✉️ Email elegante
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Ciao ${userName},</h2>
        <p>Il tuo account <strong>SmartBooking AI</strong> è stato eliminato con successo.</p>
        <p>Ci dispiace vederti andare, ma speriamo di rivederti presto!</p>
        <p style="color: #999; font-size: 0.9em;">Questa è una notifica automatica, non rispondere a questa email.</p>
      </div>
    `;

    await sendGenericEmail(userEmail, "Account SmartBooking eliminato", emailHtml);

    res.json({ message: "Account deleted successfully and confirmation email sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};