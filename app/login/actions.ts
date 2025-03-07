"use client"

// Client-side fallback for authentication
// This is a temporary solution until the API routes are properly set up

const MOCK_USERS = [
  {
    id: 1,
    email: "demo@example.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
  },
]

export async function clientSideLogin(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  }
}

