import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user, loading, error } = useUser();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (error) {
    return <Navigate to="/login" replace />;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-6 text-center">
      <h1 className="text-7xl md:text-8xl font-black tracking-tight">Welcome {user.name}</h1>
      <p className="text-slate-300 text-xl">You are logged in successfully.</p>
      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 hover:bg-red-400 text-white px-6 py-3 font-semibold"
      >
        Logout
      </button>
    </main>
  );
}

export default Home;
