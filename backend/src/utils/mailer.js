import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendVerificationEmail = async (to, name, link) => {
  await transporter.sendMail({
    from: `"Smart Booking AI" <${process.env.MAIL_USER}>`,
    to,
    subject: "Verifica la tua email",
    html: `
      <h2>Ciao ${name},</h2>
      <p>Clicca sul link per verificare la tua email:</p>
      <a href="${link}" target="_blank">${link}</a>
      <p>Il link scade in 24 ore.</p>
    `,
  });
};


export const sendGenericEmail = async (to, subject, htmlContent) => {
  await transporter.sendMail({
    from: `"Smart Booking AI" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
};
