import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "../redux/slices/authSlice";
import { api } from "../lib/api";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Effettua il login
      const res = await api.post("/auth/login", form);
      const { token } = res.data;

      // 2️⃣ Salva token in Redux + localStorage
      dispatch(loginSuccess({ token }));

      // 3️⃣ Recupera i dati utente
      const userRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = userRes.data;

      // 4️⃣ Aggiorna Redux + localStorage
      dispatch(setUser(user));

      // 5️⃣ Feedback e comportamento coerente
      if (import.meta.env.MODE === "development") {
        console.log("👤 Utente loggato:", user);
      }

      switch (user.role) {
        case "admin":
          toast.success("Accesso amministratore effettuato 🛠️");
          // TODO: redirect automatico al pannello admin
          break;

        case "customer":
          toast.success(`Benvenuto/a ${user.name || "ospite"} 🌿`);
          break;

        default:
          toast("Accesso effettuato", { icon: "✅" });
      }

      onClose();
    } catch (err) {
      console.error("Errore login:", err);
      if (err.response?.status === 403) {
        toast.error("Verifica prima la tua email 📩");
      } else {
        toast.error("Credenziali non valide");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 transform animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-emerald-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-3xl font-serif text-emerald-700 text-center mb-6">
          Accedi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-amber-50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-amber-50"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Non hai un account?{" "}
          <span
            onClick={onSwitchToRegister}
            className="text-emerald-600 hover:underline cursor-pointer font-medium"
          >
            Registrati
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
