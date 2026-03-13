import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials, setUser } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    token: auth.token,
    user: auth.user,
    setCredentials: (payload) => dispatch(setCredentials(payload)),
    setUser: (user) => dispatch(setUser(user)),
    logout: () => dispatch(logout()),
  };
}
