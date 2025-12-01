import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { BookOpen, Heart, Leaf, Users } from "lucide-react"

export const metadata = {
  title: "About Our Family - Family Tree",
  description: "Learn about our family history, heritage, and the stories that connect us across generations.",
}

export default function AboutPage() {
  const milestones = [
    {
      year: "1935",
      title: "The Beginning",
      description:
        "John Smith Sr. and Margaret established the foundation of our family legacy, embodying values of integrity and compassion.",
    },
    {
      year: "1960",
      title: "Second Generation",
      description:
        "John Jr. and Mary continued the family traditions while innovating for their time, growing the family and business.",
    },
    {
      year: "1985-2015",
      title: "Expansion Era",
      description:
        "Third generation members pursued diverse careers—medicine, architecture, technology, and education—spreading our influence.",
    },
    {
      year: "2015-Present",
      title: "Modern Chapter",
      description:
        "The family continues to grow with strong bonds, new traditions, and commitment to preserving our heritage.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Family First",
      description:
        "We believe in the importance of family bonds and prioritize maintaining strong connections across all generations.",
    },
    {
      icon: Leaf,
      title: "Heritage & Tradition",
      description: "We honor our past while creating new traditions that celebrate who we are and where we come from.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We extend our family spirit to our wider community, supporting and uplifting those around us.",
    },
    {
      icon: BookOpen,
      title: "Legacy & Stories",
      description: "We preserve our stories, photographs, and memories to inspire and guide future generations.",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Family Story</h1>
            <p className="text-lg text-foreground/70">
              Discover the rich history, cherished values, and beautiful moments that have shaped our family across
              generations.
            </p>
          </div>
        </section>

        {/* Family History Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="text-primary" size={32} />
              Our History
            </h2>
            <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
              The Smith family story began in the heart of post-war America, when John Smith Sr. and his beloved
              Margaret decided to build something lasting. What started as a simple dream has blossomed into a
              multi-generational legacy of love, achievement, and unwavering commitment to each other.
            </p>

            {/* Timeline */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-24 bg-border/40 mt-4" />}
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-foreground/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Values */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What We Value</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
                >
                  <value.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Stats */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "90", label: "Years of Heritage" },
                { number: "500+", label: "Family Members" },
                { number: "4", label: "Generations" },
                { number: "12", label: "Countries" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Roots Around the World</h2>
            <p className="text-lg text-foreground/70 mb-8">
              While our family began in the United States, we have spread our roots across the globe. From Europe to
              Asia, Australia to Africa, the Smith family has established communities and created meaningful lives in
              diverse places. This global presence enriches our family with different perspectives, cultures, and
              traditions.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  region: "North America",
                  members: "150+",
                  description: "Our ancestral home and still our largest community",
                },
                { region: "Europe", members: "100+", description: "Connected to our heritage through historical ties" },
                {
                  region: "Asia & Pacific",
                  members: "80+",
                  description: "Growing presence with new opportunities and adventures",
                },
              ].map((location, i) => (
                <div key={i} className="p-6 bg-background rounded-lg border border-border/40">
                  <h3 className="text-lg font-bold text-foreground mb-2">{location.region}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">{location.members}</p>
                  <p className="text-sm text-foreground/70">{location.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              To preserve and celebrate our family heritage by maintaining strong bonds across all generations, sharing
              our stories and memories, supporting each other through life's journey, and creating a legacy of love,
              integrity, and meaningful contribution to the world.
            </p>
            <p className="text-foreground/70">
              Every member of the Smith family carries a piece of this mission. Together, we honor our past, celebrate
              our present, and build toward a future where our children and grandchildren will know exactly where they
              come from and why they matter.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Explore Your Family</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Dive deeper into your family tree and discover the connections that bind us together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/family-tree"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Family Tree
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Search Members
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-3 bg-card text-foreground border border-border/40 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
