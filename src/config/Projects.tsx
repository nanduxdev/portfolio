import ExpressJs from '@/components/technologies/ExpressJs';
import Github from '@/components/technologies/Github';
import MongoDB from '@/components/technologies/MongoDB';
import NestJs from '@/components/technologies/NestJs';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'JobHunt Spark',
    description:
      'AI-powered career intelligence workspace that automates job discovery, scoring, application generation, and tracking across 17+ platforms from a single Google Drive folder.',
    image: '/project/job-spark.png',
    technologies: [
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'GitHub', icon: <Github key="github" /> },
    ],
    github: 'https://github.com/nanduxdev/JobHunt_Spark_Agent',
    status: 'completed',
  },
  {
    title: 'PostForge AI',
    description:
      'Multi-platform AI-powered social media post scheduler on a Turborepo monorepo with NestJS backend, Next.js 15 frontend, and a type-safe Drizzle ORM + PostgreSQL data layer.',
    image: '/project/postforge.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'NestJS', icon: <NestJs key="nestjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
    ],
    github: 'https://github.com/nanduxdev/post_forge_turbo',
    status: 'in-development',
  },
  {
    title: 'TaskFlow',
    description:
      'Full-stack task management app with Google OAuth, JWT auth, and Zod validation. React + TanStack Query + Jotai frontend; Express REST API with MongoDB.',
    image: '/project/taskflow.png',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/nanduxdev/todo-app',
    live: 'https://todo-app-nandan.vercel.app',
    status: 'completed',
  },
  {
    title: 'LeetCode List Clone',
    description:
      'Responsive client-side LeetCode problem-table clone with search, tag filtering, difficulty sorting, reusable accessible components, and client-side routing.',
    image: '/project/leetcode.png',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/nanduxdev/todo-app',
    live: 'https://leetcode-problem-list-clone.vercel.app/problem-list/Favorites',
    status: 'completed',
  },
  {
    title: 'Dairy Management System',
    description:
      'Full-stack dairy operations platform with JWT auth, RBAC (Admin/Farmer), milk collection tracking, and optimistic UI updates via TanStack Query.',
    image: '/project/dairy.png',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    github: 'https://github.com/nanduxdev/dairy_sys',
    status: 'archived',
  },
];
