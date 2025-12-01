"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Key } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner, FullPageSpinner } from "@/components/ui/spinner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [familyKey, setFamilyKey] = useState("")
  const [showFamilyKey, setShowFamilyKey] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  // Convert error messages to user-friendly messages
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const message = error.message
      if (message.includes("Invalid family key")) {
        return "Invalid family key. Please contact a family member for the correct key."
      }
      if (message.includes("auth/email-already-in-use")) {
        return "This email is already registered. Please sign in instead."
      }
      if (message.includes("auth/invalid-email")) {
        return "Please enter a valid email address."
      }
      if (message.includes("auth/network-request-failed")) {
        return "Network error. Please check your internet connection."
      }
      if (message.includes("auth/too-many-requests")) {
        return "Too many attempts. Please try again later."
      }
      return message
    }
    return "Failed to create account. Please try again."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!familyKey.trim()) {
      setError("Please enter the family key")
      return
    }

    // Split full name into first and last name
    const nameParts = fullName.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    setLoading(true)

    try {
      await signUp(email, familyKey, firstName, lastName)
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

  // Show full page spinner when redirecting after successful signup
  if (redirecting) {
    return <FullPageSpinner />
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Join the Family</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Create your Omoyele Family account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-destructive/15 p-2 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
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
                <div className="grid gap-2">
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
                  <p className="text-xs text-muted-foreground">
                    Ask a family member for the key to join
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="mr-2" />
                      Creating account...
                    </>
                  ) : (
                    "Join the Family"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
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
    </div>
  )
}
