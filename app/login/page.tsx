"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("demo@example.com") // Pre-filled for testing
  const [password, setPassword] = useState("demo123") // Pre-filled for testing
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Login form submitted with:", email)
      await login(email, password)
      console.log("Login successful, redirecting...")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // For direct navigation (temporary workaround)
  const handleDirectNavigation = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1f36] text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M12,0 C18.6274,0 24,5.3726 24,12 C24,18.6274 18.6274,24 12,24 C5.3726,24 0,18.6274 0,12 C0,5.3726 5.3726,0 12,0 Z M12,2 C6.4775,2 2,6.4775 2,12 C2,17.5225 6.4775,22 12,22 C17.5225,22 22,17.5225 22,12 C22,6.4775 17.5225,2 12,2 Z M12,5 C15.3137,5 18,7.6863 18,11 C18,14.3137 15.3137,17 12,17 C8.6863,17 6,14.3137 6,11 C6,7.6863 8.6863,5 12,5 Z M12,7 C9.7909,7 8,8.7909 8,11 C8,13.2091 9.7909,15 12,15 C14.2091,15 16,13.2091 16,11 C16,8.7909 14.2091,7 12,7 Z" />
            </svg>
            <span className="text-2xl font-bold">Quantum</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              AI That Thinks.
              <br />
              Data That Works.
            </h1>
            <p className="text-lg text-gray-300">
              Building smarter systems for a connected world. Transform your data infrastructure with AI-powered
              insights and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold">Lightning Fast</h3>
              </div>
              <p className="text-sm text-gray-400">Process data at unprecedented speeds</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="font-semibold">Secure</h3>
              </div>
              <p className="text-sm text-gray-400">Enterprise-grade security built-in</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <h3 className="font-semibold">Scalable</h3>
              </div>
              <p className="text-sm text-gray-400">Grows with your business needs</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="font-semibold">AI-Powered</h3>
              </div>
              <p className="text-sm text-gray-400">Smart insights and automation</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>© 2024 Quantum</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-muted-foreground mt-2">Smart Integration Starts with AI</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Temporary direct navigation button for testing */}
            <Button type="button" variant="outline" className="w-full h-12 text-base" onClick={handleDirectNavigation}>
              Skip Login (Temporary)
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="text-primary hover:underline">
                Create one now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

