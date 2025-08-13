"use client"

import * as React from 'react'

type AccordionContextValue = {
  value: string | null
  setValue: (v: string | null) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export function Accordion({
  type = 'single',
  collapsible = true,
  children,
  className,
}: {
  type?: 'single'
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}) {
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <div className={className}>
      <AccordionContext.Provider value={{ value, setValue, collapsible }}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}

export function AccordionItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className} data-value={value}>
      {children}
    </div>
  )
}

export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(AccordionContext)
  // Find parent item value by DOM traversal (simple approach)
  const ref = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current?.closest('[data-value]') as HTMLElement | null
    const itemValue = el?.getAttribute('data-value') || null
    if (!ctx) return
    setOpen(itemValue !== null && ctx.value === itemValue)
  }, [ctx?.value])

  const onClick = () => {
    if (!ctx) return
    const el = ref.current?.closest('[data-value]') as HTMLElement | null
    const itemValue = el?.getAttribute('data-value') || null
    if (!itemValue) return
    if (ctx.value === itemValue) {
      if (ctx.collapsible) ctx.setValue(null)
    } else {
      ctx.setValue(itemValue)
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      data-state={open ? 'open' : 'closed'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function AccordionContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(AccordionContext)
  const ref = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current?.closest('[data-value]') as HTMLElement | null
    const itemValue = el?.getAttribute('data-value') || null
    if (!ctx) return
    setOpen(itemValue !== null && ctx.value === itemValue)
  }, [ctx?.value])

  if (!open) return null
  return (
    <div ref={ref} className={className} data-state={open ? 'open' : 'closed'}>
      {children}
    </div>
  )
}
