import Link from 'next/link'
import { Mail, Github, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type SocialLink = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    href: 'mailto:tonydestinprmo@gmail.com',
    icon: Mail,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/limmieo',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/tonydestin',
    icon: Linkedin,
  },
]

type FooterLink = {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

const footerLinks: FooterLink[] = [
  {
    title: 'Explore',
    items: [
      { title: 'Work', href: '/work' },
      { title: 'Systems', href: '/systems' },
      { title: 'About', href: '/about' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { title: 'GitHub', href: 'https://github.com/limmieo', external: true },
      { title: 'LinkedIn', href: 'https://linkedin.com/in/tonydestin', external: true },
      { title: 'Email', href: 'mailto:tonydestinprmo@gmail.com' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { title: 'Privacy', href: '/privacy' },
      { title: 'Terms', href: '/terms' },
    ],
  },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-full lg:col-span-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Tony Destin</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Building digital products that people love to use.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-medium">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tony Destin. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
