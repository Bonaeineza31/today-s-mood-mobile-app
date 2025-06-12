"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate login - for demo purposes, any credentials work
      // Check if admin
      const isAdmin = email === "admin@moodsync.com"
      const userName = isAdmin ? "Admin User" : "Demo User"

      setUser({ email, name: userName })
      return { success: true }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Simulate registration
      setUser({ email, name })
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
