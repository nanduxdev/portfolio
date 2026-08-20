import CSS from '@/components/technologies/CSS';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import NestJs from '@/components/technologies/NestJs';
import NextJs from '@/components/technologies/NextJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'HiddenBrains Infotech',
    position: 'Software Trainee',
    location: 'Pune, India',
    image: '/company/hb-white.jpg',
    description: [
      'Worked on an internal *ERP system* built with Next.js and NestJS.',
      'Created common modules such as *User Management*, *Company Master*, and *Role-Based Access Control (RBAC)*.',
      'Gained hands-on experience with modular backend design, API development, and integration with frontend dashboards.',
    ],
    startDate: 'Feb 2026',
    endDate: 'Jul 2026',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'NestJS',
        href: 'https://nestjs.com/',
        icon: <NestJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
    ],
    website: 'https://www.hiddenbrains.com/',
  },
  {
    isCurrent: false,
    company: 'Codtech IT Solutions',
    position: 'React.js Web Development Intern',
    location: 'Remote',
    image: '/company/codtech-white.jpg',
    description: [
      'Completed a *4-week intensive internship* focused on learning and applying React.js in real-world projects.',
    ],
    startDate: 'Jun 2025',
    endDate: 'Jul 2025',
    technologies: [
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'JavaScript',
        href: 'https://javascript.com/',
        icon: <JavaScript />,
      },
      {
        name: 'HTML',
        href: 'https://html.com/',
        icon: <Html />,
      },
      {
        name: 'CSS',
        href: 'https://css.com/',
        icon: <CSS />,
      },
    ],
    website: 'https://codtechitsolutions.in/internship',
  },
];
