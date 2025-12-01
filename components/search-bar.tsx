"use client"

import { useState, useRef, useEffect } from "react"
import { familyMembers } from "@/lib/family-data"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof familyMembers>([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const lowerQuery = query.toLowerCase()
    const results = familyMembers
      .filter(
        (member) => member.name.toLowerCase().includes(lowerQuery) || member.bio.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 8)

    setSuggestions(results)
    setIsOpen(true)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
        <input
          type="text"
          placeholder="Search family members by name or bio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border/40 rounded-lg focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/40 rounded-lg shadow-lg overflow-hidden z-50">
          {suggestions.map((member, index) => (
            <Link
              key={member.id}
              href={`/member/${member.id}`}
              onClick={() => {
                setQuery("")
                setIsOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border/20 last:border-b-0"
            >
              <img
                src={member.photo || "/placeholder.svg?height=40&width=40"}
                alt={member.name}
                className="w-10 h-10 rounded-lg object-cover bg-muted"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{member.name}</p>
                <p className="text-xs text-foreground/50">{member.bio.substring(0, 50)}...</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/40 rounded-lg shadow-lg p-4 text-center text-foreground/60 z-50">
          No members found. Try another search.
        </div>
      )}
    </div>
  )
}
