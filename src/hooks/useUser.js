import { useEffect, useRef, useState } from "react";
import { fetchMe } from "../api/authApi";
import { useAuth } from "./useAuth";

export function useUser() {
  const { token, user, setUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const attemptedProviderHydration = useRef(false);

  useEffect(() => {
    if (!token) {
      attemptedProviderHydration.current = false;
      return;
    }

    if (user?.provider) {
      attemptedProviderHydration.current = true;
      return;
    }

    if (user && attemptedProviderHydration.current) {
      return;
    }

    let isMounted = true;

    async function loadUser() {
      attemptedProviderHydration.current = true;
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
  }, [token, user?.id, user?.provider, setUser, logout]);

  return { user, loading, error };
}
