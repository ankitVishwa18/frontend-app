import { createSlice } from "@reduxjs/toolkit";
import { clearAuthToken, getAuthToken, setAuthToken } from "../utils/authStorage";

const initialState = {
  token: getAuthToken(),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user = null } = action.payload;
      state.token = token;
      state.user = user;
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
