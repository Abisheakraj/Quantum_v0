"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { clientSideLogin } from "@/app/login/actions"

interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    console.log("Attempting login for:", email)

    try {
      // Try the API route first
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        console.log("Login response status:", response.status)

        const data = await response.json()

        if (!response.ok) {
          console.error("API login failed:", data.error || "Unknown error")
          throw new Error(data.error || "Login failed")
        }

        console.log("API login successful")
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        return
      } catch (apiError) {
        console.warn("API login failed, falling back to client-side login:", apiError)

        // Fall back to client-side login
        const result = await clientSideLogin(email, password)
        console.log("Client-side login successful")
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

