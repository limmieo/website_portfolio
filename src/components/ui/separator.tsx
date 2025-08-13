import * as React from 'react'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal', className = '', ...props }: SeparatorProps) {
  const base = orientation === 'vertical'
    ? 'h-full w-px'
    : 'h-px w-full'
  return <div role="separator" className={`${base} bg-border ${className}`} {...props} />
}
