import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Home from "./components/auth/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GoogleRedirect from "./components/auth/GoogleRedirect";
import Layout from "./pages/Layout";
import GmailPage from "./pages/GmailMessagePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<GoogleRedirect />} />
      <Route path="/gmail" element={<GmailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
