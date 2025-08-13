"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DynamicTaglineProps {
  taglines: string[]
  className?: string
}

export function DynamicTagline({ taglines, className }: DynamicTaglineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (taglines.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [taglines.length])

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {taglines[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
