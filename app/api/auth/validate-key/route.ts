import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { familyKey } = body

    // Validate family key
    const validFamilyKey = process.env.FAMILY_KEY
    if (!familyKey || familyKey !== validFamilyKey) {
      return NextResponse.json(
        { valid: false, error: "Invalid family key" },
        { status: 401 }
      )
    }

    return NextResponse.json({ valid: true }, { status: 200 })
  } catch (error) {
    console.error("Validation error:", error)
    return NextResponse.json(
      { valid: false, error: "Failed to validate key" },
      { status: 500 }
    )
  }
}
