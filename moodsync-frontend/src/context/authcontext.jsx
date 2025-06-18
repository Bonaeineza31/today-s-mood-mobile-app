"use client";

import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStored = async () => {
      const storedToken = await SecureStore.getItemAsync("authToken");
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          setUser(decoded);
          setToken(storedToken);
        } catch (err) {
          console.warn("Invalid token found in storage, clearing...");
          await SecureStore.deleteItemAsync("authToken");
        }
      }
      setLoading(false);
    };
    loadStored();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://192.168.43.200:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Login error:", data);
        throw new Error(data.error || "Login failed");
      }

      const decoded = jwtDecode(data.token);
      setUser(decoded);
      setToken(data.token);
      await SecureStore.setItemAsync("authToken", data.token);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch("http://192.168.43.200:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Registration error:", data);
        throw new Error(data.error || "Registration failed");
      }

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
