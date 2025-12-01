"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { familyMembers } from "@/lib/family-data"
import { MemberCard } from "@/components/member-card"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof familyMembers>([])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Search Your Family</h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
              Find family members by name, discover their stories, and explore their lineage.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto">
            <div className="relative flex gap-2">
              <input
                type="text"
                placeholder="Enter a family member's name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-3 bg-card border border-border/40 rounded-lg focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Results */}
          {searchResults.length > 0 ? (
            <div>
              <p className="text-sm text-foreground/60 mb-6">
                Found {searchResults.length} member{searchResults.length !== 1 ? "s" : ""}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60 mb-4">No family members found matching "{searchQuery}"</p>
              <p className="text-foreground/50">Try searching for a different name or browse the family tree.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">Start typing to search for family members</p>
            </div>
          )}

          {/* Popular Members */}
          {searchQuery.trim().length === 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Popular Family Members</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {familyMembers.slice(0, 6).map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
