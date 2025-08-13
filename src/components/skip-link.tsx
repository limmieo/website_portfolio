'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function SkipLink() {
  const pathname = usePathname()
  const skipLinkRef = useRef<HTMLAnchorElement>(null)
  
  // Focus the skip link when the route changes
  useEffect(() => {
    if (skipLinkRef.current) {
      skipLinkRef.current.focus()
    }
  }, [pathname])
  
  return (
    <a
      ref={skipLinkRef}
      href="#main-content"
      className={cn(
        'absolute left-4 top-4 z-50 -translate-y-16 rounded-md border bg-background px-4 py-2 font-medium',
        'transition-transform duration-200 focus:translate-y-0 focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'sr-only focus:not-sr-only focus:static'
      )}
    >
      Skip to main content
    </a>
  )
}
