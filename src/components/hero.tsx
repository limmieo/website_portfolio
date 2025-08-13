"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowRight, Download, Mail, Star } from "lucide-react"
import { DynamicTagline } from "@/components/dynamic-tagline"

interface HeroProps {
  name: string
  roles: string[]
  tagline: string
  taglines?: string[] // Multiple taglines for dynamic rotation
  ctaPrimary?: {
    text: string
    href: string
  }
  ctaSecondary: {
    text: string
    href: string
  }
  photo: {
    src: string
    alt: string
  }
  featuredProject?: {
    title: string
    description: string
    link: string
  }
}

export function Hero({ name, roles, tagline, taglines, ctaPrimary, ctaSecondary, photo, featuredProject }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {roles.join(' • ')}
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {name}
            </motion.h1>
            
            <motion.div
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {taglines && taglines.length > 1 ? (
                <DynamicTagline taglines={taglines} />
              ) : (
                <span>{tagline}</span>
              )}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {ctaPrimary && ctaPrimary.text && ctaPrimary.href && (
                <Button asChild size="lg" className="group">
                  <Link href={ctaPrimary.href}>
                    {ctaPrimary.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href={ctaSecondary.href} className="flex items-center">
                  {ctaSecondary.text}
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="flex items-center text-sm text-muted-foreground">
                <span className="relative mr-2 inline-flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Available for full-time roles and projects
              </p>
            </motion.div>

            {/* Featured Project */}
            {featuredProject && (
              <motion.div
                className="mt-8 rounded-lg border bg-card p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-primary">Featured Project</span>
                </div>
                <h3 className="font-semibold text-foreground">{featuredProject.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{featuredProject.description}</p>
                {/^https?:\/\//.test(featuredProject.link) ? (
                  <a
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                  >
                    {featuredProject.link.includes('github.com') ? 'View on GitHub' : 'View Project'}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  <Link 
                    href={featuredProject.link}
                    className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                  >
                    View Project <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                )}
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="relative h-80 sm:h-96 md:h-[32rem] group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top shadow-2xl transition-transform duration-300 group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -right-4 bottom-8 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/20 bg-background/80 backdrop-blur-sm">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
