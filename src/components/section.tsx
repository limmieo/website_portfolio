import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  innerClassName?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    as: Component = 'section', 
    className, 
    spacing = 'md',
    innerClassName,
    children, 
    ...props 
  }, ref) => {
    const spacingMap = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-20 md:py-32',
      xl: 'py-24 md:py-40',
    }

    return (
      <Component 
        ref={ref} 
        className={cn(
          'w-full px-4 sm:px-6 lg:px-8',
          spacingMap[spacing],
          className
        )} 
        {...props}
      >
        <div className={cn('mx-auto w-full max-w-7xl', innerClassName)}>
          {children}
        </div>
      </Component>
    )
  }
)

Section.displayName = 'Section'

export { Section }
