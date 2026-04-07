import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials, setUser } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const setCredentialsAction = useCallback(
    (payload) => dispatch(setCredentials(payload)),
    [dispatch],
  );
  const setUserAction = useCallback(
    (user) => dispatch(setUser(user)),
    [dispatch],
  );
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    token: auth.token,
    user: auth.user,
    setCredentials: setCredentialsAction,
    setUser: setUserAction,
    logout: logoutAction,
  };
}
