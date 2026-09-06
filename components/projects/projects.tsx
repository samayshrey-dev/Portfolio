import {
  ArrowRight,
  Compass,
  ExternalLink,
  Layers,
  LineChart,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  tech: string[];
  imageRatio: number;
  image: string;
  imageAlt: string;
  liveUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: "eventhub",
    icon: Sparkles,
    iconLabel: "SkillHub",
    title: "Community Learning & Event Marketplace",
    description:
      "A platform enabling skill providers & residential societies to organize learning events. Built with Django REST Framework, PostgreSQL, and AI recommendations.",
    meta: "Full-Stack Developer | Aug 2026 – Present",
    tech: ["Python", "Django", "PostgreSQL", "OpenStreetMap", "FCM", "GitHub"],
    imageRatio: 1024 / 768,
    image: "/assets/posters/skillhub.png",
    imageAlt: "SkillHub Community Learning & Event Marketplace",
  },
  {
    id: "autoswift",
    icon: Compass,
    iconLabel: "AutoSwift",
    title: "Mobile Automotive Service & Billing Platform",
    description:
      "Doorstep automobile service & billing platform with technician repair tracking, WhatsApp API invoice sharing, operational dashboards, and OpenAI AI assistant.",
    meta: "Full-Stack Developer Intern | Jun 2026 – Jul 2026",
    tech: ["React.js", "Bootstrap", "Django", "DRF", "WhatsApp API", "OpenAI"],
    imageRatio: 1024 / 768,
    image: "/assets/posters/autoswift.png",
    imageAlt: "AutoSwift Billing & Service Platform Dashboard",
    liveUrl: "https://easygarage-frontend.vercel.app/",
  },
  {
    id: "medfinder",
    icon: LineChart,
    iconLabel: "MediAI",
    title: "Live Pharmacy Medicine Search Platform",
    description:
      "Interactive map-based platform enabling users to search for medicines, track live pharmacy inventory, get price updates, and AI medicine suggestions.",
    meta: "Fullstack Developer | Apr 2026 – May 2026",
    tech: ["Python", "Django", "DRF", "SQL Server", "Geolocation APIs", "AI Search"],
    imageRatio: 1024 / 768,
    image: "/assets/posters/mediai.png",
    imageAlt: "MediAI Platform",
    liveUrl: "https://medifind-steel.vercel.app/",
  },
  {
    id: "resqtracker",
    icon: Wand2,
    iconLabel: "ResQTrack",
    title: "Animal Rescue & NGO Coordination Platform",
    description:
      "Hackathon finalist platform for stray animal rescue and NGO coordination with Leaflet map tracking, SMS emergency alerts, and AI injury classification.",
    meta: "Hackathon Finalist | Mar 2026",
    tech: ["React.js", "Node.js", "SQL", "Leaflet.js", "OpenStreetMap", "SMS API"],
    imageRatio: 1024 / 768,
    image: "/assets/posters/resqtrack.png",
    imageAlt: "ResQTrack Animal Rescue Platform",
    liveUrl: "https://resq-seven-rose.vercel.app/",
  },
  {
    id: "onboardx",
    icon: Layers,
    iconLabel: "OnboardX",
    title: "Smart Onboarding & Approval System",
    description:
      "Web partner onboarding platform for partner registration, dynamic checklist document verification, multi-stage approval workflows, and activity logging.",
    meta: "Full-Stack Developer Intern | Jun 2025 – Aug 2025",
    tech: ["React.js", "Django", "DRF", "PostgreSQL", "Bootstrap", "JWT"],
    imageRatio: 1024 / 768,
    image: "/assets/posters/onboardx.png",
    imageAlt: "OnboardX Platform",
    liveUrl: "https://onboardx-enterprise.vercel.app/",
  },
];

interface ProjectsProps {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
}

export function Projects({
  withHeadline = true,
  viewMoreVisible = false,
}: ProjectsProps = {}): ReactNode {
  const displayedProjects = viewMoreVisible ? PROJECTS.slice(0, 3) : PROJECTS;

  return (
    <section className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline && (
          <FadeIn className="flex flex-col gap-3 pb-12 sm:pb-16">
            <p className="text-[15px] font-semibold tracking-tight text-foreground/60">
              Featured Work
            </p>
            <h2 className="text-[2.25rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
              Internships & Independent Projects
            </h2>
          </FadeIn>
        )}

        <div className="flex flex-col gap-16 sm:gap-24">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible && (
          <FadeIn className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/30"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  const isEven = index % 2 === 0;

  return (
    <FadeIn>
      <div className="group border-foreground/8 bg-foreground/2 dark:bg-foreground/5 grid grid-cols-1 gap-8 rounded-4xl border p-6 transition-all duration-300 hover:border-foreground/15 sm:p-10 lg:grid-cols-12 lg:items-center">
        <div
          className={`flex flex-col gap-5 lg:col-span-6 ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground/80 shadow-xs w-fit">
            <Icon className="h-3.5 w-3.5 text-sky-400" />
            <span>{project.iconLabel}</span>
          </div>

          <h3 className="text-[1.75rem] font-medium leading-tight tracking-tight text-foreground sm:text-[2rem]">
            {project.title}
          </h3>

          <p className="text-[16px] leading-relaxed text-foreground/70">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-foreground/10 bg-background/50 px-2.5 py-1 text-xs font-medium text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-xs font-medium text-foreground/50">
              {project.meta}
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-foreground/10 hover:border-foreground/30"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5 text-sky-400" />
              </a>
            )}
          </div>
        </div>

        <div
          className={`lg:col-span-6 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-video w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/80 shadow-md group-hover:border-foreground/25"
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-1.03"
              />
            </a>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/80 shadow-md">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-1.03"
              />
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
