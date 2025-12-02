"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { History, Clock } from "lucide-react"

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="flex h-full flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <History className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Family History</h1>
          <p className="max-w-md text-muted-foreground">
            This page will showcase the rich history of the Omoyele family — stories, 
            milestones, and memorable moments passed down through generations.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Coming soon
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
