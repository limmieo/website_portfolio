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
  // Optional links
  url?: string // primary link (usually wraps title)
  companyUrl?: string // secondary link (wraps company/degree line)
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
  dense?: boolean
}

export function Timeline({ items, className, dense = false }: TimelineProps) {
  const spaceY = dense ? 'space-y-3' : 'space-y-8'
  const dotOuter = dense ? 'h-5 w-5 border-2' : 'h-8 w-8 border-4'
  const dotInner = dense ? 'h-1.5 w-1.5' : 'h-2 w-2'
  const cardPadding = dense ? 'p-3' : 'p-6'
  const metaMargin = dense ? 'mb-1' : 'mb-4'
  const titleSize = dense ? 'text-base' : 'text-lg'
  const companySize = dense ? 'text-sm' : 'text-base'
  const metaText = dense ? 'text-xs' : 'text-sm'
  const descSize = dense ? 'text-xs' : 'text-sm'
  return (
    <div className={className}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
        
        <div className={spaceY}>
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
              <div className={`relative z-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border-blue-500 ${dotOuter}`}>
                <div className={`${dotInner} rounded-full bg-blue-500`} />
              </div>
              
              {/* Content */}
              <div className="ml-6 flex-1">
                <div className={`rounded-lg bg-white dark:bg-gray-800 ${cardPadding} shadow-md border border-gray-200 dark:border-gray-700`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`${titleSize} font-semibold text-gray-900 dark:text-white`}>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.current && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Current
                      </span>
                    )}
                  </div>
                  
                  {item.company && item.company.trim().length > 0 && item.company.trim() !== item.title.trim() && (
                    <div className={`${companySize} font-medium text-blue-600 dark:text-blue-400 mb-2`}>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </div>
                  )}
                  
                  <div className={`flex flex-col sm:flex-row sm:items-center ${metaText} text-gray-500 dark:text-gray-400 ${metaMargin} space-y-1 sm:space-y-0 sm:space-x-4`}>
                    {(() => {
                      const hasStart = !!(item.startDate && item.startDate.trim().length > 0)
                      const hasEndRaw = !!(item.endDate && item.endDate.trim().length > 0)
                      const end = hasEndRaw ? item.endDate : (item.current ? 'Present' : '')
                      const hasEnd = !!(end && end.trim().length > 0)
                      const dateText = hasStart && hasEnd
                        ? `${item.startDate} - ${end}`
                        : (hasStart ? item.startDate : (hasEnd ? end : ''))
                      return dateText ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {dateText}
                        </div>
                      ) : null
                    })()}
                    {item.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className={`${descSize} text-gray-600 dark:text-gray-300 flex items-start`}>
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
