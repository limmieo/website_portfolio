export type SocialLinks = {
  linkedin: string;
  x: string;
  youtube: string;
  instagram: string;
};

export type Content = {
  site: {
    owner: string;
    location: string;
    email: string;
    socials: SocialLinks;
    resume: string;
  };
  hero: {
    name: string;
    roles: string[];
    tagline: string;
    photo: Image;
    ctas: CTA[];
  };
  about: {
    title?: string;
    summary: string; // HTML string
    bullets: string[];
    skills: SkillGroup[];
    headshot: Image;
    faqs: FAQItem[];
    experience: ExperienceItem[];
    education: EducationItem[];
  };
  highlights: Highlight[];
  workedWith: Brand[];
  caseStudies: CaseStudy[];
  systems: System[];
  testimonials: Testimonial[];
  contact: Contact;
};

export type Image = {
  src: string;
  alt: string;
};

export type CTA = {
  label: string;
  href: string;
};

export type FAQItem = {
  question: string;
  answer: string; // HTML string
};

export type Highlight = {
  label: string;
  value: string;
  desc: string;
};

export type Brand = {
  name: string;
  logo: Image;
  url: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  cover: Image;
  summary: string;
  category?: string;
  tags?: string[];
  stack?: string[];
  metrics: Metric[];
  whyItWorks: string[];
  media: Media[];
  links: Links;
};

export type Metric = {
  label: string;
  value: string;
};

export type Media = {
  type: 'image' | 'video' | 'link';
  src: string;
  alt?: string;
  caption?: string;
};

export type Links = {
  repo?: string;
  demo?: string;
};

export type System = {
  slug: string;
  title: string;
  subtitle: string;
  cover: Image;
  stack?: string[];
  outcomes: string[];
  repo: string;
};

export type Testimonial = {
  name: string;
  role: string;
  photo: Image;
  quote: string;
};

export type Contact = {
  email: string;
  note: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies?: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
};
