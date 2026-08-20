import { redirect } from 'next/navigation';

// Per-project detail pages have been replaced by in-page dialogs.
// Any old deep-link to /projects/[slug] redirects back to the projects grid.
export default function ProjectCaseStudyPage() {
  redirect('/projects');
}
