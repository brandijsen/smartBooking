import { FaSpa, FaLeaf, FaHotTub, FaHands } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section
        className="relative h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-9e64e7c4e9c3?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white">
          <div className="px-6">
            <h1 className="text-4xl sm:text-6xl font-serif mb-6">
              Ritrova il tuo equilibrio interiore
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Benvenuto in <span className="text-emerald-300 font-semibold">Lumine Spa</span> — il
              tuo rifugio di benessere nel cuore della città.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition">
              Prenota ora
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-amber-50 text-center text-slate-700">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-serif text-emerald-700">
            Un’esperienza di puro relax
          </h2>
          <p className="text-lg leading-relaxed">
            Lumine Spa è un’oasi di pace dove corpo e mente ritrovano armonia. Offriamo
            trattamenti rigeneranti, massaggi personalizzati e percorsi sensoriali pensati per il
            tuo benessere totale.
          </p>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-emerald-700">
            I nostri servizi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div className="p-8 bg-amber-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaHands className="text-emerald-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Massaggi</h3>
              <p className="text-slate-600">
                Trattamenti rilassanti e decontratturanti per rigenerare corpo e mente.
              </p>
            </div>

            <div className="p-8 bg-amber-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaSpa className="text-emerald-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Trattamenti viso</h3>
              <p className="text-slate-600">
                Cura e luminosità per la tua pelle con prodotti naturali e tecniche avanzate.
              </p>
            </div>

            <div className="p-8 bg-amber-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaHotTub className="text-emerald-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Sauna & Percorsi</h3>
              <p className="text-slate-600">
                Percorsi termali e saune per favorire la purificazione e il relax profondo.
              </p>
            </div>

            <div className="p-8 bg-amber-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaLeaf className="text-emerald-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Pacchetti benessere</h3>
              <p className="text-slate-600">
                Combinazioni di trattamenti pensate per offrirti un’esperienza completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-emerald-600 py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6 font-serif">
            Regala o regalati un momento di benessere
          </h2>
          <p className="mb-8 text-emerald-100">
            Scopri le nostre offerte speciali e prenota subito il tuo trattamento personalizzato.
          </p>
          <button className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-full hover:bg-amber-100 transition">
            Scopri le offerte
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
