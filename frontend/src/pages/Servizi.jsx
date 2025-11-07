import { useState, useEffect } from "react";
import { api } from "../lib/api";

const Servizi = () => {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServizi = async () => {
      try {
        const res = await api.get("/servizi");
        setServizi(res.data);
      } catch (err) {
        console.error("Errore nel caricamento:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServizi();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {servizi.map((s) => (
        <div key={s.id} className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-serif text-emerald-700">{s.nome}</h3>
          <p className="text-slate-600 mt-2">{s.descrizione}</p>
        </div>
      ))}
    </div>
  );
};

export default Servizi;
