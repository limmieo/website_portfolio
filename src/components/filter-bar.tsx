"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type FilterOption = {
  id: string
  label: string
  value: string
  count: number
}

type FilterGroupProps = {
  title: string
  options: FilterOption[]
  selected: string[]
  onSelect: (value: string) => void
  className?: string
}

function FilterGroup({
  title,
  options,
  selected,
  onSelect,
  className,
}: FilterGroupProps) {
  if (!options.length) return null

  return (
    <div className={className}>
      <h3 className="mb-3 text-sm font-medium">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-auto w-full justify-between px-2 py-1 text-left text-sm font-normal",
                selected.includes(option.value) && "bg-accent"
              )}
              onClick={() => onSelect(option.value)}
            >
              <span>{option.label}</span>
              <Badge variant="secondary" className="ml-2">
                {option.count}
              </Badge>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

type FilterBarProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  yearFilters: FilterOption[]
  stackFilters: FilterOption[]
  selectedYears: string[]
  selectedStacks: string[]
  onYearSelect: (year: string) => void
  onStackSelect: (stack: string) => void
  onClearFilters: () => void
  className?: string
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  yearFilters,
  stackFilters,
  selectedYears,
  selectedStacks,
  onYearSelect,
  onStackSelect,
  onClearFilters,
  className,
}: FilterBarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const hasActiveFilters = selectedYears.length > 0 || selectedStacks.length > 0

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileOpen && !target.closest('.filter-bar')) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen])

  return (
    <div className={cn("filter-bar", className)}>
      {/* Mobile filter button */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden"
        >
          {isMobileOpen ? 'Hide' : 'Show'} filters
        </Button>
      </div>

      {/* Mobile filter panel */}
      <div
        className={cn(
          "lg:hidden",
          isMobileOpen ? 'block' : 'hidden',
          "fixed inset-0 z-50 bg-background p-6 overflow-y-auto"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
          >
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close filters</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="search" className="mb-2 block">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <FilterGroup
            title="Year"
            options={yearFilters}
            selected={selectedYears}
            onSelect={onYearSelect}
          />

          <FilterGroup
            title="Tech Stack"
            options={stackFilters}
            selected={selectedStacks}
            onSelect={onStackSelect}
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden lg:block space-y-8">
        <div>
          <Label htmlFor="desktop-search" className="mb-2 block">
            Search
          </Label>
          <Input
            id="desktop-search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <FilterGroup
          title="Year"
          options={yearFilters}
          selected={selectedYears}
          onSelect={onYearSelect}
        />

        <FilterGroup
          title="Tech Stack"
          options={stackFilters}
          selected={selectedStacks}
          onSelect={onStackSelect}
        />

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  )
}

// Simple X icon component
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
