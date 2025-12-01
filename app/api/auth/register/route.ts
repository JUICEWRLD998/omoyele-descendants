import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, firebaseUid, familyKey } = body

    // Validate family key
    const validFamilyKey = process.env.FAMILY_KEY
    if (!familyKey || familyKey !== validFamilyKey) {
      return NextResponse.json(
        { error: "Invalid family key. Please contact a family member for the correct key." },
        { status: 401 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Create new user in database
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        firebaseUid,
        displayName: `${firstName} ${lastName}`,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
}
