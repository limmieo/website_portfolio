"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  caption?: string
}

interface GalleryProps {
  items: MediaItem[]
  className?: string
}

export function Gallery({ items, className }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openModal = (index: number) => setSelectedIndex(index)
  const closeModal = () => setSelectedIndex(null)
  const goToPrev = () => 
    setSelectedIndex(prev => (prev !== null && prev > 0 ? prev - 1 : items.length - 1))
  const goToNext = () => 
    setSelectedIndex(prev => (prev !== null && prev < items.length - 1 ? prev + 1 : 0))

  if (!items.length) return null

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={`${item.src}-${index}`}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-muted"
            onClick={() => openModal(index)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-black">
                <div className="relative h-full w-full">
                  <video
                    src={item.src}
                    className="h-full w-full object-contain"
                    poster={item.alt}
                    aria-label={item.alt}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-background/80 p-4">
                      <PlayIcon className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm">{item.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Dialog open={selectedIndex !== null} onOpenChange={closeModal}>
            <DialogContent className="max-w-4xl p-0">
              <div className="relative aspect-video w-full">
                {items[selectedIndex]?.type === 'image' ? (
                  <Image
                    src={items[selectedIndex].src}
                    alt={items[selectedIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <video
                    src={items[selectedIndex]?.src}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                  />
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={closeModal}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrev()
                  }}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                  <span className="sr-only">Previous</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                  <span className="sr-only">Next</span>
                </Button>

                {items[selectedIndex]?.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4 text-center backdrop-blur-sm">
                    <p className="text-sm">{items[selectedIndex].caption}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
