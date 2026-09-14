import BetterAuth from '@/components/technologies/BetterAuth';
import Drizzle from '@/components/technologies/Drizzle';
import ExpressJs from '@/components/technologies/ExpressJs';
import Gemini from '@/components/technologies/Gemini';
import MarkDownIcon from '@/components/technologies/MarkDownIcon';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TriggerDev from '@/components/technologies/Trigger';
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
      { name: 'Gemini', icon: <Gemini key="gemini" /> },

      { name: 'SKILLS.md', icon: <MarkDownIcon key="SKILLS.md" /> },
    ],
    github: 'https://github.com/nanduxdev/JobHunt_Spark_Agent',
    status: 'completed',
  },
  {
    title: 'SkillTrail',
    description:
      'AI-powered content assistant that helps users turn their work, learning, and discoveries into platform-specific social posts for LinkedIn and X, with AI-assisted editing, previews, publishing, and scheduling.',
    image: '/project/skill-trail.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Drizzle ORM', icon: <Drizzle key="drizzle" /> },
      { name: 'Better Auth', icon: <BetterAuth key="better-auth" /> },
      { name: 'Trigger.dev', icon: <TriggerDev key="trigger-dev" /> },
      { name: 'Vercel AI SDK', icon: <Vercel key="vercel " /> },
    ],
    github: 'https://github.com/nanduxdev/SkillTrail',
    live: 'https://skilltrail.nandux.dev',
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
