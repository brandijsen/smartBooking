import { useState } from "react";
import { api } from "../lib/api";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Registrazione completata!");
      onSwitchToLogin(); // torna al login dopo la registrazione
    } catch {
      toast.error("Errore durante la registrazione");
    }
  };

  return (
   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 transform animate-slideUp">
        {/* Pulsante chiusura */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-emerald-600 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Titolo */}
        <h2 className="text-3xl font-serif text-emerald-700 text-center mb-6">
          Registrati
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Nome</label>
            <input
              name="name"
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Inserisci il tuo nome"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Inserisci la tua email"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-50"
              placeholder="Crea una password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Crea account
          </button>
        </form>

        {/* Link login */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Hai già un account?{" "}
          <span
            onClick={onSwitchToLogin}
            className="text-emerald-600 hover:underline cursor-pointer font-medium"
          >
            Accedi
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
