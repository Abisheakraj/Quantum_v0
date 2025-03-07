import { NextResponse } from "next/server"

// This is a mock user database - in production you would use your actual database
const MOCK_USERS = [
  {
    id: 1,
    email: "demo@example.com",
    // In production, this would be a hashed password
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("Login attempt:", { email, password: "***" }) // Log for debugging

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      console.log("Invalid credentials")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("Login successful for user:", user.email)

    // Return success response
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

