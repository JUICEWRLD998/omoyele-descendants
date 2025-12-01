"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Lightbox } from "@/components/lightbox"
import { ImageIcon } from "lucide-react"

interface GalleryImage {
  src: string
  title: string
  description: string
}

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const galleryImages: GalleryImage[] = [
    {
      src: "/multigenerational-family-photo.png",
      title: "Family Reunion 2023",
      description: "A memorable gathering of the entire family at the summer estate.",
    },
    {
      src: "/vintage-family-portrait.png",
      title: "Vintage Family Portrait",
      description: "A treasured photograph from 1980 capturing three generations.",
    },
    {
      src: "/joyful-wedding-celebration.png",
      title: "Wedding Day",
      description: "A joyful celebration of love and family bonds.",
    },
    {
      src: "/holiday-gathering-family.jpg",
      title: "Holiday Celebration",
      description: "Warmth and togetherness during the festive season.",
    },
    {
      src: "/family-beach-fun.png",
      title: "Beach Vacation",
      description: "Creating memories by the shore with loved ones.",
    },
    {
      src: "/children-playing-together.jpg",
      title: "Next Generation",
      description: "The joy and laughter of the youngest family members.",
    },
    {
      src: "/formal-family-photo-portrait.jpg",
      title: "Formal Portrait Session",
      description: "An elegant family portrait taken professionally.",
    },
    {
      src: "/multigenerational-family-photo.jpg",
      title: "Four Generations",
      description: "A rare photograph featuring four generations of our family.",
    },
    {
      src: "/family-picnic-outdoor.jpg",
      title: "Summer Picnic",
      description: "A perfect day spent together in nature.",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon size={32} className="text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Family Memories</h1>
            </div>
            <p className="text-lg text-foreground/60 max-w-2xl">
              A collection of cherished moments that celebrate our family's journey and the bonds that connect us across
              generations.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
                <div className="relative bg-muted rounded-lg overflow-hidden aspect-square border border-border/40 hover:border-primary/60 transition-all duration-300">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="font-bold text-lg text-white">{image.title}</h3>
                    <p className="text-sm text-white/80 mt-2">{image.description}</p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      <ImageIcon size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <section className="mt-16 p-8 bg-card rounded-lg border border-border/40">
            <h2 className="text-2xl font-bold text-foreground mb-4">Preserving Our Heritage</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              These photographs represent more than just images—they are windows into our family's story. Each picture
              captures moments of connection, celebration, and growth that have shaped who we are today.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              We encourage all family members to contribute their cherished memories to this gallery. Together, we can
              create a living archive of our heritage for future generations to treasure.
            </p>
          </section>
        </div>
      </main>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  )
}
