import { Navigation } from "@/components/navigation"
import { FamilyTreeCanvas } from "@/components/family-tree-canvas"

export const metadata = {
  title: "Family Tree - Interactive Visualization",
  description: "Explore the complete family tree with zoom, pan, and member details.",
}

export default function FamilyTreePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Family Tree</h1>
            <p className="text-foreground/60">
              Explore your lineage across generations. Click on any member to view their profile.
            </p>
          </div>

          {/* Tree Visualization */}
          <div className="h-screen bg-card rounded-lg border border-border/40 shadow-lg overflow-hidden">
            <FamilyTreeCanvas />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="font-semibold text-foreground mb-3">How to use:</h2>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                • <strong>Zoom:</strong> Use the zoom buttons in the top right or scroll to zoom in/out
              </li>
              <li>
                • <strong>Pan:</strong> Click and drag the canvas to move around
              </li>
              <li>
                • <strong>View Profile:</strong> Click on any family member to view their detailed profile
              </li>
              <li>
                • <strong>Reset:</strong> Click the home button to return to the default view
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
