import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Link to="/gmail" className="text-sm text-cyan-300 hover:text-cyan-200">
          Gmail
        </Link>
        ;<h1 className="font-semibold tracking-wide">Auth App</h1>
      </div>
    </header>
  );
}

export default Navbar;
