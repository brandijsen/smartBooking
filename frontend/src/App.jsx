import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const loading = useAuthCheck();
  const location = useLocation();

  if (loading) return <Loader fullscreen />;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-slate-800 font-sans">
      <Header />

      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Home />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
