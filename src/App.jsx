import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Home from "./components/auth/Home";
import Login from "./components/auth/Login";
import GoogleRedirect from "./components/auth/GoogleRedirect";
import MailPage from "./pages/MailMessagePage";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/mails" element={<MailPage />} />
        <Route path="/gmail" element={<Navigate to="/mails" replace />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/oauth-success" element={<GoogleRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
