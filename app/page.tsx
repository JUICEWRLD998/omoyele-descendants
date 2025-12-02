"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex h-full items-center justify-center p-6 lg:p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to the Omoyele Family
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Explore your heritage, connect with family, and preserve memories for generations.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
