"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  images: { src: string; title: string }[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Escape") onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors text-foreground z-10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          <img
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-start p-4">
          <button
            onClick={handlePrevious}
            className="p-3 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors text-foreground"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center justify-end p-4">
          <button
            onClick={handleNext}
            className="p-3 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors text-foreground"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Info */}
        <div className="bg-foreground/5 border-t border-foreground/20 p-4 text-center text-foreground">
          <p className="font-semibold">{images[currentIndex].title}</p>
          <p className="text-sm text-foreground/60 mt-1">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}
