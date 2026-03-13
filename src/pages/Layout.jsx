import Navbar from "../components/common/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
