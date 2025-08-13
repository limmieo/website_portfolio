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
      className={cn("flex flex-col items-center text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-4xl font-bold text-primary md:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-lg font-semibold text-foreground">
        {label}
      </span>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  )
}
