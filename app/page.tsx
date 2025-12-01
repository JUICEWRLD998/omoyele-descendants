import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { ArrowRight, Leaf, Search, Users } from "lucide-react"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
              Discover Your Family's Story
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 text-balance mb-8 max-w-2xl mx-auto">
              Connect across generations. Explore your lineage, celebrate your heritage, and preserve family memories
              for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/family-tree"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore Family Tree
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Find a Member
                <Search size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Explore Your Family Tree?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Connect Generations",
                  description:
                    "Bridge the gap between past and present. Understand how your ancestors shaped your family story.",
                },
                {
                  icon: Search,
                  title: "Easy Discovery",
                  description: "Quickly search and find family members. View complete lineage with just a few clicks.",
                },
                {
                  icon: Leaf,
                  title: "Preserve Heritage",
                  description: "Keep family memories, photos, and stories alive for future generations to cherish.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-background rounded-lg border border-border/40 hover:border-border transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Stats Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Family Members" },
                { number: "10", label: "Generations" },
                { number: "1200+", label: "Photos & Memories" },
                { number: "150+", label: "Years of History" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to explore your roots?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Start your family tree journey today and uncover the rich tapestry of your heritage.
            </p>
            <Link
              href="/family-tree"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
            >
              View Family Tree
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Family Tree</h3>
                <p className="text-foreground/60">Preserving family heritage for generations</p>
              </div>
              <div className="flex gap-6 text-sm text-foreground/60">
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/family-tree" className="hover:text-foreground transition-colors">
                  Tree
                </Link>
                <Link href="/gallery" className="hover:text-foreground transition-colors">
                  Gallery
                </Link>
              </div>
            </div>
            <div className="border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
              <p>&copy; 2025 Family Tree. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
