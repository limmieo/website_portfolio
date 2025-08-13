# Tony Destin - Portfolio

A modern, performant portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS and shadcn/ui
- 📱 Fully responsive design
- 🌓 Dark/light mode
- 🎨 Custom animations with Framer Motion
- 📝 MDX support for case studies
- 🔍 SEO optimized with Next.js Metadata API
- ⚡ Optimized for performance

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

All content is managed through the `/src/content/content.json` file. You can update the following sections:

- Site information (title, description, etc.)
- Hero section
- About section
- Work/Projects
- Systems/Tools
- Testimonials
- Contact information

### Adding a New Project

1. Add a new entry to the `caseStudies` array in `content.json`
2. Add project images to `/public/images/projects`
3. Create an MDX file in `/src/content/case-studies` for the project details

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio&project-name=portfolio&repository-name=portfolio)

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the repository to Vercel
3. Add environment variables if needed
4. Deploy!

### Netlify

1. Push your code to a Git repository
2. Import the repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `.next`
5. Deploy!

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [MDX](https://mdxjs.com/) - Content
- [Lucide Icons](https://lucide.dev/) - Icons

## Performance

The site is optimized for performance with:

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts
- Static generation where possible
- Performance monitoring

## Accessibility

This website is built with accessibility in mind:

- Semantic HTML5
- ARIA attributes where needed
- Keyboard navigation
- Focus management
- Sufficient color contrast
- Screen reader support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Next.js Documentation](https://nextjs.org/docs) for the excellent documentation
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
