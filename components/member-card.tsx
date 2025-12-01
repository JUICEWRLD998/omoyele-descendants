"use client"

import { type FamilyMember, familyMembers } from "@/lib/family-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface MemberCardProps {
  member: FamilyMember
}

export function MemberCard({ member }: MemberCardProps) {
  const parents = member.parentIds.map((id) => familyMembers.find((m) => m.id === id)).filter(Boolean)

  const children = member.childrenIds.map((id) => familyMembers.find((m) => m.id === id)).filter(Boolean)

  return (
    <div className="bg-card border border-border/40 rounded-lg overflow-hidden hover:border-border transition-colors">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden flex items-center justify-center">
        <img
          src={member.photo || "/placeholder.svg?height=192&width=100%&query=family member"}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{member.name}</h2>

        {/* Dates */}
        <p className="text-sm text-foreground/60 mb-4">
          {new Date(member.dateOfBirth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {member.dateOfDeath && (
            <>
              {" - "}
              {new Date(member.dateOfDeath).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </>
          )}
        </p>

        {/* Bio */}
        <p className="text-foreground/70 mb-6">{member.bio}</p>

        {/* Relations */}
        {(parents.length > 0 || children.length > 0) && (
          <div className="space-y-4 pt-4 border-t border-border/40">
            {parents.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-2">Parents</h3>
                <div className="space-y-2">
                  {parents.map((parent) => (
                    <Link
                      key={parent?.id}
                      href={`/member/${parent?.id}`}
                      className="flex items-center justify-between p-2 bg-muted rounded hover:bg-muted/80 transition-colors group"
                    >
                      <span className="text-sm text-foreground">{parent?.name}</span>
                      <ArrowRight size={16} className="text-foreground/40 group-hover:text-foreground/60" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {children.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-2">Children</h3>
                <div className="space-y-2">
                  {children.map((child) => (
                    <Link
                      key={child?.id}
                      href={`/member/${child?.id}`}
                      className="flex items-center justify-between p-2 bg-muted rounded hover:bg-muted/80 transition-colors group"
                    >
                      <span className="text-sm text-foreground">{child?.name}</span>
                      <ArrowRight size={16} className="text-foreground/40 group-hover:text-foreground/60" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Profile Link */}
        <Link
          href={`/member/${member.id}`}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          View Full Profile
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
