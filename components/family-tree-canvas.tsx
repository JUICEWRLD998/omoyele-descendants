"use client"

import type React from "react"

import { type FamilyMember, familyMembers } from "@/lib/family-data"
import { useState, useRef } from "react"
import Link from "next/link"
import { ZoomIn, ZoomOut, Home } from "lucide-react"

export function FamilyTreeCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 0.5)
      return newZoom
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 2 && (e.target as HTMLElement).closest("[data-draggable]")) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPan({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Group members by generation
  const generationGroups = Array.from({ length: 4 }).map((_, gen) => familyMembers.filter((m) => m.generation === gen))

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-b from-background to-card overflow-hidden rounded-lg border border-border/40"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      data-draggable
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-card border border-border/40 rounded-lg p-2 shadow-lg">
        <button
          onClick={() => handleZoom("in")}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          title="Zoom in"
        >
          <ZoomIn size={20} className="text-primary" />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          title="Zoom out"
        >
          <ZoomOut size={20} className="text-primary" />
        </button>
        <div className="w-px bg-border/40" />
        <button onClick={handleReset} className="p-2 hover:bg-muted rounded-md transition-colors" title="Reset view">
          <Home size={20} className="text-primary" />
        </button>
      </div>

      {/* Tree Container */}
      <div
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Generations */}
        {generationGroups.map((generation, genIndex) => (
          <div
            key={genIndex}
            className="absolute w-full flex justify-center gap-8"
            style={{
              top: `${genIndex * 200}px`,
              width: "100%",
            }}
          >
            {generation.map((member, memberIndex) => (
              <TreeNode key={member.id} member={member} totalInGen={generation.length} indexInGen={memberIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function TreeNode({
  member,
  totalInGen,
  indexInGen,
}: { member: FamilyMember; totalInGen: number; indexInGen: number }) {
  return (
    <Link href={`/member/${member.id}`}>
      <div className="flex flex-col items-center cursor-pointer">
        {/* Node Box */}
        <div className="w-40 bg-card border-2 border-primary/40 hover:border-primary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-105 duration-200">
          {/* Photo */}
          <div className="relative h-32 bg-muted overflow-hidden flex items-center justify-center">
            <img
              src={member.photo || "/placeholder.svg?height=128&width=160&query=family member"}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-bold text-sm text-foreground line-clamp-2">{member.name}</h3>
            <p className="text-xs text-foreground/60 mt-1">
              {new Date(member.dateOfBirth).getFullYear()}
              {member.dateOfDeath ? ` - ${new Date(member.dateOfDeath).getFullYear()}` : ""}
            </p>
            <p className="text-xs text-foreground/50 mt-2 line-clamp-2">{member.bio}</p>
          </div>
        </div>

        {/* Connection Lines */}
        {member.childrenIds.length > 0 && <div className="relative w-0.5 h-12 bg-primary/20 mt-2" />}
      </div>
    </Link>
  )
}
