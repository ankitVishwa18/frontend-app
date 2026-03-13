import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function GoogleRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCredentials } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setCredentials({ token });
    navigate("/", { replace: true });
  }, [navigate, searchParams, setCredentials]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Signing you in...</p>
    </div>
  );
}

export default GoogleRedirect;
