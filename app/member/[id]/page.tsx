import { Navigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { familyMembers, getFamilyMemberById } from "@/lib/family-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Users } from "lucide-react"

interface MemberPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: MemberPageProps) {
  const { id } = await params
  const member = getFamilyMemberById(id)

  if (!member) return { title: "Member Not Found" }

  return {
    title: `${member.name} - Family Tree`,
    description: member.bio,
  }
}

export async function generateStaticParams() {
  return familyMembers.map((member) => ({
    id: member.id,
  }))
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params
  const member = getFamilyMemberById(id)

  if (!member) notFound()

  const parents = member.parentIds.map((pid) => getFamilyMemberById(pid)).filter(Boolean)

  const children = member.childrenIds.map((cid) => getFamilyMemberById(cid)).filter(Boolean)

  const siblings =
    member.parentIds.length > 0
      ? familyMembers.filter((m) => m.id !== member.id && m.parentIds.some((pid) => member.parentIds.includes(pid)))
      : []

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Family Tree", href: "/family-tree" },
              { label: member.name, href: `/member/${member.id}` },
            ]}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Photo and Basic Info */}
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="bg-card rounded-lg border border-border/40 overflow-hidden shadow-lg">
                {/* Photo */}
                <div className="relative h-96 bg-muted overflow-hidden flex items-center justify-center">
                  <img
                    src={member.photo || "/placeholder.svg?height=384&width=100%"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Basic Info */}
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-foreground mb-4">{member.name}</h1>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-foreground/70 mb-6 pb-6 border-b border-border/40">
                    <Calendar size={20} />
                    <div>
                      <p className="text-sm">
                        {new Date(member.dateOfBirth).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {member.dateOfDeath && (
                        <p className="text-sm text-foreground/50">
                          to{" "}
                          {new Date(member.dateOfDeath).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Generation Info */}
                  <div className="mb-6">
                    <p className="text-sm text-foreground/60">Generation</p>
                    <p className="text-lg font-semibold text-foreground">
                      {member.generation === 0 && "Founders"}
                      {member.generation === 1 && "Children"}
                      {member.generation === 2 && "Grandchildren"}
                      {member.generation === 3 && "Great-Grandchildren"}
                    </p>
                  </div>

                  {/* Back Button */}
                  <Link
                    href="/family-tree"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to Tree
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Bio and Relations */}
            <div className="flex-1">
              {/* Biography */}
              <section className="bg-card rounded-lg border border-border/40 p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Biography</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">{member.bio}</p>
              </section>

              {/* Family Relations */}
              <div className="space-y-8">
                {/* Parents */}
                {parents.length > 0 && (
                  <section className="bg-card rounded-lg border border-border/40 p-8 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                      <Users size={20} className="text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">Parents</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {parents.map((parent) => (
                        <Link
                          key={parent?.id}
                          href={`/member/${parent?.id}`}
                          className="p-4 bg-muted rounded-lg border border-border/40 hover:border-primary/60 transition-colors group"
                        >
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {parent?.name}
                          </p>
                          <p className="text-sm text-foreground/60 mt-1">
                            {new Date(parent?.dateOfBirth || "").getFullYear()} -
                            {parent?.dateOfDeath ? ` ${new Date(parent.dateOfDeath).getFullYear()}` : " Present"}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Siblings */}
                {siblings.length > 0 && (
                  <section className="bg-card rounded-lg border border-border/40 p-8 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                      <Users size={20} className="text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">Siblings</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {siblings.map((sibling) => (
                        <Link
                          key={sibling.id}
                          href={`/member/${sibling.id}`}
                          className="p-4 bg-muted rounded-lg border border-border/40 hover:border-primary/60 transition-colors group"
                        >
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {sibling.name}
                          </p>
                          <p className="text-sm text-foreground/60 mt-1">
                            {new Date(sibling.dateOfBirth).getFullYear()} -
                            {sibling.dateOfDeath ? ` ${new Date(sibling.dateOfDeath).getFullYear()}` : " Present"}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Children */}
                {children.length > 0 && (
                  <section className="bg-card rounded-lg border border-border/40 p-8 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                      <Users size={20} className="text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">Children</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {children.map((child) => (
                        <Link
                          key={child?.id}
                          href={`/member/${child?.id}`}
                          className="p-4 bg-muted rounded-lg border border-border/40 hover:border-primary/60 transition-colors group"
                        >
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {child?.name}
                          </p>
                          <p className="text-sm text-foreground/60 mt-1">
                            {new Date(child?.dateOfBirth || "").getFullYear()} -
                            {child?.dateOfDeath ? ` ${new Date(child.dateOfDeath).getFullYear()}` : " Present"}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
