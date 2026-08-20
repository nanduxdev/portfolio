'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { ProjectDialog } from './ProjectDialog';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { trackEvent } = useUmami();

  const projectId = project.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const trackProject = (
    action: AnalyticsEventData['project_click']['action'],
  ) =>
    trackEvent({
      name: 'project_click',
      data: {
        projectId,
        projectTitle: project.title,
        action,
        location: 'project_card',
      },
    });

  return (
    <>
      <Card className="group h-full w-full cursor-pointer overflow-hidden border-gray-100 p-0 shadow-none transition-all hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-600">
        {/* Image — clicking opens dialog */}
        <CardHeader
          className="p-0"
          onClick={() => {
            setDialogOpen(true);
            trackProject('view_details');
          }}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={project.image}
              alt={project.title}
              width={1920}
              height={1080}
            />
          </div>
        </CardHeader>

        <CardContent className="px-6 py-4">
          <div className="space-y-4">
            {/* Title + external links */}
            <div className="flex items-center justify-between gap-4">
              {/* Title — clicking opens dialog */}
              <button
                className="group-hover:text-primary text-left text-xl leading-tight font-semibold hover:cursor-pointer"
                onClick={() => {
                  setDialogOpen(true);
                  trackProject('view_details');
                }}
              >
                {project.title}
              </button>

              {/* External icon links — stop propagation so they don't open the dialog */}
              <div className="flex items-center gap-2">
                {project.live && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                        href={project.live}
                        target="_blank"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackProject('visit_website');
                        }}
                      >
                        <Website />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Website</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.github && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                        href={project.github}
                        target="_blank"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackProject('visit_github');
                        }}
                      >
                        <Github />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Description — clamped on card, full in dialog */}
            <p className="text-secondary line-clamp-3 text-sm">
              {project.description}
            </p>

            {/* Tech stack */}
            <div>
              <h4 className="text-secondary mb-2 text-sm font-medium">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                        {technology.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{technology.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project detail dialog — rendered outside the Card to avoid nesting issues */}
      <ProjectDialog
        project={project}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
