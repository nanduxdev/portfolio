'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Github from '../svgs/Github';
import Website from '../svgs/Website';

interface ProjectDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-0">
        {/* Media — video takes priority over image */}
        <div className="relative w-full overflow-hidden rounded-t-lg">
          {project.video ? (
            <video
              className="aspect-video w-full object-cover"
              src={project.video}
              autoPlay
              loop
              muted
              controls
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={1920}
              height={1080}
              className="aspect-video w-full object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 px-6 pt-2 pb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {/* Full description — no line-clamp */}
          <p className="text-secondary text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium">Technologies</h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-default items-center gap-1.5 rounded-md border border-gray-200 px-2 py-1 text-xs dark:border-gray-700">
                      <span className="size-4 shrink-0">{tech.icon}</span>
                      <span>{tech.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{tech.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Status badge */}
          {(() => {
            const statusMap = {
              completed: {
                dot: 'bg-green-500',
                badge:
                  'border border-green-300 bg-green-500/10 text-green-700 dark:text-green-400',
                label: 'Completed',
              },
              'in-development': {
                dot: 'bg-blue-500',
                badge:
                  'border border-blue-300 bg-blue-500/10 text-blue-700 dark:text-blue-400',
                label: 'In Development',
              },
              archived: {
                dot: 'bg-gray-400',
                badge:
                  'border border-gray-300 bg-gray-500/10 text-gray-600 dark:text-gray-400',
                label: 'Archived',
              },
            } satisfies Record<
              typeof project.status,
              { dot: string; badge: string; label: string }
            >;

            const { dot, badge, label } = statusMap[project.status];
            return (
              <div
                className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs ${badge}`}
              >
                <div className={`size-2 animate-pulse rounded-full ${dot}`} />
                {label}
              </div>
            );
          })()}

          {/* Action buttons */}
          {(project.github || project.live) && (
            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
              {project.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-secondary hover:text-primary flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                    >
                      <Github className="size-4" />
                      GitHub
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View source on GitHub</TooltipContent>
                </Tooltip>
              )}
              {project.live && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.live}
                      target="_blank"
                      className="text-secondary hover:text-primary flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                    >
                      <Website className="size-4" />
                      Live Site
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Open live site</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
