import { createContext, useContext, useState } from "react";
import { loginUser, setAuthToken } from "../api/auth";

const AuthContext = createContext(null);

/* ================= INITIAL STATE ================= */
const getInitialAuth = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
  
    // 🚨 Guard against invalid values
    if (!token || !userStr || userStr === "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { token: null, user: null };
    }
  
    try {
      const user = JSON.parse(userStr);
      setAuthToken(token);
      return { token, user };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // 🚨 If JSON is corrupted, reset auth
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { token: null, user: null };
    }
  };
  

export const AuthProvider = ({ children }) => {
  const [{ token, user }, setAuth] = useState(getInitialAuth);
  const [loading] = useState(false);

  /* ================= LOGIN ================= */
  const login = async (data) => {
    const res = await loginUser(data);
    const { token, user } = res.data;

    setAuth({ token, user });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthToken(token);

    return user;
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setAuth({ token: null, user: null });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
