const Loader = ({ fullscreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "fixed inset-0 bg-white/70 backdrop-blur-[1px] z-50" : "h-[50vh]"
      }`}
    >
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
