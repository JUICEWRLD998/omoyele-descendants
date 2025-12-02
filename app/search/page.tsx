"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { familyMembers } from "@/lib/family-data"
import { MemberCard } from "@/components/member-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof familyMembers>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasSearched(true)

    if (searchQuery.trim().length === 0) {
      setSearchResults([])
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const results = familyMembers.filter(
      (member) => member.name.toLowerCase().includes(lowerQuery) || member.bio.toLowerCase().includes(lowerQuery),
    )

    setSearchResults(results)
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Search Lineage
          </h1>
          <p className="text-muted-foreground">
            Find family members by name, discover their stories, and explore their lineage.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter a family member's name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>

        {/* Results */}
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {searchResults.length} member{searchResults.length !== 1 ? "s" : ""}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ) : hasSearched && searchQuery.trim().length > 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">
              No family members found matching "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground/70">
              Try searching for a different name or browse the family tree.
            </p>
          </div>
        ) : null}

        {/* Popular Members - show when no search */}
        {!hasSearched && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Popular Family Members
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyMembers.slice(0, 6).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
