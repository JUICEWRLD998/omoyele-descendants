"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { FamilyTreeCanvas } from "@/components/family-tree-canvas"

export default function FamilyTreePage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Family Tree</h1>
          <p className="text-muted-foreground">
            Explore your lineage across generations. Click on any member to view their profile.
          </p>
        </div>

        {/* Tree Visualization */}
        <div className="flex-1 min-h-[500px] bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
          <FamilyTreeCanvas />
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h2 className="font-semibold text-foreground mb-2 text-sm">How to use:</h2>
          <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-4">
            <div><strong>Zoom:</strong> Use scroll or buttons</div>
            <div><strong>Pan:</strong> Click and drag canvas</div>
            <div><strong>View Profile:</strong> Click any member</div>
            <div><strong>Reset:</strong> Click home button</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
