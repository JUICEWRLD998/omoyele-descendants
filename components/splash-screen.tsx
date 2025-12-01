"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { FullPageSpinner } from "@/components/ui/spinner"

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Show splash for 2 seconds on initial load
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // After splash and auth loading complete, redirect if not logged in
    if (!showSplash && !loading && !user) {
      router.push("/login")
    }
  }, [showSplash, loading, user, router])

  // Show splash screen
  if (showSplash || loading) {
    return <FullPageSpinner />
  }

  // Not logged in - will redirect to login
  if (!user) {
    return <FullPageSpinner />
  }

  // Logged in - show content
  return <>{children}</>
}
