"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Skill {
  name: string
  level: number // 0-100
  category?: string
}

interface SkillsProgressProps {
  skills: Skill[]
  className?: string
}

export function SkillsProgress({ skills, className }: SkillsProgressProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className}>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {skill.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
