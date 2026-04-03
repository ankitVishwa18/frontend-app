import { createSlice } from "@reduxjs/toolkit";
import {
  clearAuthToken,
  getAuthToken,
  getAuthUserFromToken,
  setAuthToken,
} from "../utils/authStorage";

const initialToken = getAuthToken();
const initialState = {
  token: initialToken,
  user: getAuthUserFromToken(initialToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user = null } = action.payload;
      state.token = token;
      state.user = user || getAuthUserFromToken(token);
      setAuthToken(token);
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      clearAuthToken();
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
