'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    
    toast({
      title: 'Copied!',
      description: `${text} has been copied to your clipboard.`,
    })
    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`h-6 w-6 ${className}`}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  )
}
