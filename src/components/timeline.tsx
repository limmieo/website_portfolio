"use client"

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

interface TimelineItem {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description: string[]
  current?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={className}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
        
        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-4 border-blue-500">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </div>
              
              {/* Content */}
              <div className="ml-6 flex-1">
                <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.current && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="text-base font-medium text-blue-600 dark:text-blue-400 mb-2">
                    {item.company}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {item.startDate} - {item.endDate || 'Present'}
                    </div>
                    {item.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
