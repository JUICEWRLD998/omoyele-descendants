"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Key } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner, FullPageSpinner } from "@/components/ui/spinner"

export function LoginForm({
  className,
}: {
  className?: string
}) {
  const [email, setEmail] = useState("")
  const [familyKey, setFamilyKey] = useState("")
  const [showFamilyKey, setShowFamilyKey] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  // Convert error messages to user-friendly messages
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const message = error.message
      if (message.includes("Invalid family key")) {
        return "Invalid family key. Please check and try again."
      }
      if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password") || message.includes("auth/user-not-found")) {
        return "Invalid email or family key. Please try again."
      }
      if (message.includes("auth/invalid-email")) {
        return "Please enter a valid email address."
      }
      if (message.includes("auth/user-disabled")) {
        return "This account has been disabled. Please contact a family admin."
      }
      if (message.includes("auth/network-request-failed")) {
        return "Network error. Please check your internet connection."
      }
      if (message.includes("auth/too-many-requests")) {
        return "Too many failed attempts. Please try again later."
      }
      return message
    }
    return "Failed to sign in. Please try again."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, familyKey)
      setLoading(false)
      setRedirecting(true)
      // Show spinner for 2 seconds before redirecting to home
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err: unknown) {
      setError(getErrorMessage(err))
      setLoading(false)
    }
  }

  // Show full page spinner when redirecting after successful login
  if (redirecting) {
    return <FullPageSpinner />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col gap-6", className)}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Sign in to your Family account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="familyKey" className="flex items-center gap-2">
                    <Key className="size-4" />
                    Family Key
                  </Label>
                  <div className="relative">
                    <Input
                      id="familyKey"
                      type={showFamilyKey ? "text" : "password"}
                      placeholder="Enter the family key"
                      value={familyKey}
                      onChange={(e) => setFamilyKey(e.target.value)}
                      required
                      disabled={loading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFamilyKey(!showFamilyKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showFamilyKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/family-pic.jpg"
              alt="Omoyele Family"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
