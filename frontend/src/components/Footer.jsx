const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-white text-center py-8 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm sm:text-base mb-4">
          © 2025 <span className="font-semibold">Lumine Spa</span> — Tutti i diritti riservati
        </p>

        <div className="flex justify-center space-x-6 text-emerald-100">
          <a
            href="#"
            className="hover:text-white transition-colors text-sm sm:text-base"
          >
            Termini e condizioni
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors text-sm sm:text-base"
          >
            Privacy policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors text-sm sm:text-base"
          >
            Contattaci
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
