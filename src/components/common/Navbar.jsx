import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/login");
  }

  const profileName = user?.name?.trim() || user?.email || "Profile";

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold tracking-wide text-white">SaaS Billing</h1>
          <Link to="/" className="text-sm text-cyan-300 hover:text-cyan-200">
            Dashboard
          </Link>
          <Link to="/gmail" className="text-sm text-cyan-300 hover:text-cyan-200">
            Gmail Data
          </Link>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium hover:bg-slate-700"
          >
            {profileName}
          </button>
          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-700 bg-slate-900 p-2 shadow-xl">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-red-300 hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
