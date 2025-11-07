import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // 🔐 Gestione modali
  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  // 🚪 Logout
  const handleLogout = () => {
    dispatch(logout());
    toast("Disconnessione effettuata.", { icon: "👋" });
    setShowMenu(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 relative">
        {/* LOGO */}
        <h1 className="text-2xl font-serif text-emerald-700 tracking-wide">
          Lumine<span className="text-emerald-500">Spa</span>
        </h1>

        {/* MENU CENTRALE */}
        <ul className="hidden sm:flex space-x-8 text-slate-700 font-medium">
           <li>
    <Link
      to="/"
      className="hover:text-emerald-600 cursor-pointer transition-colors"
    >
      Home
    </Link>
  </li>
  <li>
    <Link
      to="/servizi"
      className="hover:text-emerald-600 cursor-pointer transition-colors"
    >
      Servizi
    </Link>
  </li>
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Offerte
          </li>
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Contatti
          </li>
        </ul>

        {/* ICONA UTENTE / LOGIN */}
        <div className="flex items-center relative">
          {!user ? (
            <FaSignInAlt
              size={22}
              className="text-slate-600 hover:text-emerald-600 cursor-pointer transition"
              title="Accedi"
              onClick={openLogin}
            />
          ) : (
            <>
              <FaUserCircle
                size={26}
                className="text-emerald-700 hover:text-emerald-600 cursor-pointer transition"
                title={user.name || "Profilo utente"}
                onClick={() => setShowMenu(!showMenu)}
              />

              {/* MENU A TENDINA */}
              {showMenu && (
                <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-lg shadow-md w-40 text-sm animate-fadeIn">
                  <p className="px-4 py-2 border-b text-slate-700 font-medium">
                    {user.name || user.email}
                  </p>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-50 text-slate-700"
                    onClick={() => toast("Pagina profilo in arrivo ✨")}
                  >
                    Profilo
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {/* MODALI LOGIN / REGISTER */}
      {showLogin && (
        <LoginModal onClose={closeModals} onSwitchToRegister={openRegister} />
      )}
      {showRegister && (
        <RegisterModal onClose={closeModals} onSwitchToLogin={openLogin} />
      )}
    </header>
  );
};

export default Header;
