"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User } from "firebase/auth"
import { onAuthChange, signIn, signUp, signOut, getIdToken } from "@/lib/firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<User>
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<User>
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

  const handleSignUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const firebaseUser = await signUp(email, password, firstName, lastName)
    
    // Create user in database
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
      }),
    })

    return firebaseUser
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
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
