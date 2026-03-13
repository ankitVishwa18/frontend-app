import { useEffect, useState } from "react";
import { fetchMe } from "../api/authApi";
import { useAuth } from "./useAuth";

export function useUser() {
  const { token, user, setUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || user) {
      return;
    }

    let isMounted = true;

    async function loadUser() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchMe(token);
        if (isMounted) {
          setUser(data.user);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          logout();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [token, user, setUser, logout]);

  return { user, loading, error };
}
