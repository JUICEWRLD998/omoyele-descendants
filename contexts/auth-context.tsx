"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User } from "firebase/auth"
import { onAuthChange, signIn as firebaseSignIn, signUp as firebaseSignUp, signOut, getIdToken } from "@/lib/firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, familyKey: string) => Promise<User>
  signUp: (email: string, familyKey: string, firstName: string, lastName: string) => Promise<User>
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignIn = async (email: string, familyKey: string) => {
    // Validate family key first
    const validateResponse = await fetch("/api/auth/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyKey }),
    })

    if (!validateResponse.ok) {
      throw new Error("Invalid family key. Please contact a family member for the correct key.")
    }

    // Use family key as password for Firebase (simplified auth)
    const firebaseUser = await firebaseSignIn(email, familyKey)
    return firebaseUser
  }

  const handleSignUp = async (
    email: string,
    familyKey: string,
    firstName: string,
    lastName: string
  ) => {
    // Validate family key first via API
    const validateResponse = await fetch("/api/auth/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyKey }),
    })

    if (!validateResponse.ok) {
      throw new Error("Invalid family key. Please contact a family member for the correct key.")
    }

    // Use family key as password for Firebase (simplified auth)
    const firebaseUser = await firebaseSignUp(email, familyKey, firstName, lastName)
    
    // Try to create user in database (but don't fail if it doesn't work)
    try {
      const token = await firebaseUser.getIdToken()
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          firebaseUid: firebaseUser.uid,
          familyKey,
        }),
      })
    } catch (dbError) {
      // Log but don't fail - Firebase auth is the primary auth
      console.error("Failed to save user to database:", dbError)
    }

    return firebaseUser
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut,
    getIdToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
