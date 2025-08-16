"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatProps {
  label: string
  value: string
  description?: string
  className?: string
}

export function Stat({ label, value, description, className }: StatProps) {
  return (
    <motion.div
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm",
        "bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 p-6 text-center shadow-sm ring-1 ring-black/20",
        "transition-transform transition-shadow transition-colors hover:shadow-lg hover:ring-2 hover:ring-primary/20",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-4xl font-bold text-primary md:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-lg font-semibold text-white">
        {label}
      </span>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-white/70">
          {description}
        </p>
      )}
    </motion.div>
  )
}
