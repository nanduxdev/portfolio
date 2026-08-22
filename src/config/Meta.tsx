import { about } from './About';
import { heroConfig } from './Hero';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
  name: heroConfig.name,
  title: `${heroConfig.name} - ${heroConfig.title}`,
  description:
    'Full Stack Developer building modern web applications with Next.js, NestJS, React, TypeScript, and PostgreSQL.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  ogImage: '/meta/opengraph-image.png',
  author: {
    name: about.name,
    github: 'nanduxdev',
    linkedin: 'nanduxdev',
    email: 'naganenandan@gmail.com',
  },
  keywords: [
    'portfolio',
    'developer',
    'full-stack developer',
    'React',
    'Next.js',
    'NestJS',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Drizzle ORM',
    'web development',
    heroConfig.name.toLowerCase(),
  ],
};

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: `${heroConfig.name} - ${heroConfig.title}`,
    description: `${about.description} Explore my projects, experience, and technical expertise.`,
    keywords: [
      'Nandan Nagane',
      'full-stack developer',
      'Next.js developer',
      'NestJS developer',
      'React developer',
      'TypeScript developer',
      'web development',
    ],
    ogImage: '/meta/hero.png',
    twitterCard: 'summary_large_image',
  },

  '/contact': {
    title: `Contact ${about.name}`,
    description:
      'Get in touch with Nandan Nagane about software development opportunities, collaborations, or projects.',
    keywords: [
      'contact Nandan Nagane',
      'full-stack developer',
      'software developer',
      'developer opportunities',
    ],
    ogImage: '/meta/contact.png',
    twitterCard: 'summary_large_image',
  },

  '/work-experience': {
    title: `Work Experience - ${about.name}`,
    description:
      'Explore Nandan Nagane’s professional experience as a Software Trainee at HiddenBrains Infotech and React.js Web Development Intern at Codtech IT Solutions.',
    keywords: [
      'Nandan Nagane experience',
      'HiddenBrains Infotech',
      'Codtech IT Solutions',
      'Next.js',
      'NestJS',
      'React.js',
    ],
    ogImage: '/meta/work.png',
    twitterCard: 'summary_large_image',
  },

  '/projects': {
    title: `Projects - ${about.name}`,
    description:
      'Explore Nandan Nagane’s documented full-stack projects, including PostForge AI, JobHunt Spark, TaskFlow, the Dairy Management System, and the LeetCode Problem List Clone.',
    keywords: [
      'Nandan Nagane projects',
      'PostForge AI',
      'JobHunt Spark',
      'TaskFlow',
      'Dairy Management System',
      'full-stack projects',
    ],
    ogImage: '/meta/projects.png',
    twitterCard: 'summary_large_image',
  },

  '/resume': {
    title: `Resume - ${about.name}`,
    description: `View ${about.name}'s professional resume, technical skills, experience, education, and software development projects.`,
    keywords: [
      'Nandan Nagane resume',
      'full-stack developer resume',
      'Next.js developer resume',
      'NestJS developer resume',
      'software engineer resume',
    ],
    ogImage: '/meta/resume.png',
    twitterCard: 'summary',
  },
};

export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata['/'];
}

export function generateMetadata(pathname: string) {
  const pageMeta = getPageMetadata(pathname);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(', '),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}
