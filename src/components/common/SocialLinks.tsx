'use client';

import { socialLinks } from '@/config/Hero';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

import { TrackedLink } from './TrackedLink';

export default function SocialLinksComp() {
  return (
    <>
      {socialLinks.map((link) => (
        <Tooltip key={link.name} delayDuration={0}>
          <TooltipTrigger asChild>
            <TrackedLink
              href={link.href}
              key={link.name}
              className="text-secondary flex items-center gap-2"
              track={{
                name: 'external_link_click',
                data: {
                  url: link.href,
                  text: link.name,
                  location: 'hero_social',
                },
              }}
            >
              <span className="size-6">{link.icon}</span>
            </TrackedLink>
          </TooltipTrigger>
          <TooltipContent>
            <p>{link.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
