import Image from "next/image"
import Link from "next/link"
import { Content } from "@/types/content"

interface LogoStripProps {
  brands: Content['workedWith']
  className?: string
}

export function LogoStrip({ brands, className }: LogoStripProps) {
  if (!brands?.length) return null

  return (
    <div className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
              aria-label={`View ${brand.name}`}
            >
              <div className="relative h-12 w-32 transition-opacity hover:opacity-80">
                <Image
                  src={brand.logo.src}
                  alt={brand.logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
