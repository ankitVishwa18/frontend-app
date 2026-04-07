import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

function Home() {
  const { user, loading, error } = useUser();

  if (error) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{loading ? "Loading..." : "Preparing dashboard..."}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <section className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Welcome {user.name}</h1>
        <p className="text-slate-300">
          Dashboard is now focused only on mail subscription and SaaS billing insights.
        </p>

        <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
          <h2 className="text-xl font-semibold mb-2">Next Step</h2>
          <p className="text-slate-300">
            Open <span className="font-semibold text-cyan-300">Mail Data</span> from the navbar to view subscription
            classifications and billing summaries.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
