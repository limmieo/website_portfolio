"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  title: string
  description: string
  cover: {
    src: string
    alt: string
  }
  tags?: string[]
  href: string
  className?: string
  year?: string
}

export function ProjectCard({
  title,
  description,
  cover,
  tags = [],
  href,
  className,
  year,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link href={href} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{title}</CardTitle>
              {year && <span className="text-sm text-muted-foreground">{year}</span>}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{description}</p>
          </CardContent>
          {tags.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          )}
        </Card>
      </Link>
    </motion.div>
  )
}
