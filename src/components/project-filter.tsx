"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export interface FilterItem {
  label: string;
  value: string | null;
}

interface ProjectFilterProps {
  filters: FilterItem[];
  activeFilter: string | null;
  onChange: (category: string | null) => void;
  className?: string;
}

export function ProjectFilter({ filters, activeFilter, onChange, className }: ProjectFilterProps) {
  const handleFilterClick = (value: string | null) => {
    onChange(value)
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter
          
          return (
            <motion.div
              key={filter.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick(filter.value)}
                className={`rounded-full ${isActive ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {filter.label}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
