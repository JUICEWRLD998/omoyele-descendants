"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Lightbox } from "@/components/lightbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Images, Upload } from "lucide-react"

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
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Family Gallery
          </h1>
          <p className="text-muted-foreground">
            A collection of cherished moments that celebrate our family's journey across generations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group cursor-pointer" 
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative bg-muted rounded-lg overflow-hidden aspect-square border border-border/50 hover:border-primary/50 transition-all duration-300">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-white">{image.title}</h3>
                  <p className="text-sm text-white/80 mt-1 line-clamp-2">{image.description}</p>
                </div>

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <Images size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <Card className="border-border/50 bg-linear-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Contribute to the Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              These photographs represent more than just images—they are windows into our family's story. 
              Each picture captures moments of connection, celebration, and growth.
            </p>
            <p>
              We encourage all family members to contribute their cherished memories. Together, we can 
              create a living archive for future generations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </DashboardLayout>
  )
}
