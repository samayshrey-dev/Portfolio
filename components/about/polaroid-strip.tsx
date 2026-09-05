"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  MapPin,
  Terminal,
} from "lucide-react";
import { useRef, useSyncExternalStore, type ComponentType, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Polaroid = {
  id: string;
  rotate: number;
  title: string;
  subtitle: string;
  tag: string;
  badgeBg: string;
  accentGradient: string;
  icon: ComponentType<{ className?: string }>;
};

const PHOTOS: Polaroid[] = [
  {
    id: "python",
    rotate: -7,
    title: "Python & DRF",
    subtitle: "REST APIs & Backend",
    tag: "BACKEND",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    accentGradient: "from-sky-500/15 via-blue-500/5 to-transparent",
    icon: Terminal,
  },
  {
    id: "react",
    rotate: 5,
    title: "React & Next.js",
    subtitle: "Modern Frontend UI",
    tag: "FRONTEND",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    accentGradient: "from-cyan-500/15 via-sky-500/5 to-transparent",
    icon: Code2,
  },
  {
    id: "ai",
    rotate: -4,
    title: "AI & OpenAI",
    subtitle: "LLMs & Agent Systems",
    tag: "INTELLIGENCE",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    accentGradient: "from-purple-500/15 via-indigo-500/5 to-transparent",
    icon: BrainCircuit,
  },
  {
    id: "db",
    rotate: 6,
    title: "PostgreSQL",
    subtitle: "Relational Databases",
    tag: "DATABASE",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accentGradient: "from-blue-500/15 via-indigo-500/5 to-transparent",
    icon: Database,
  },
  {
    id: "gis",
    rotate: -5,
    title: "Maps & GIS",
    subtitle: "Leaflet & Geolocation",
    tag: "LOCATION",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accentGradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    icon: MapPin,
  },
  {
    id: "git",
    rotate: 4,
    title: "Git & DevOps",
    subtitle: "CI/CD & Workflows",
    tag: "WORKFLOW",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    accentGradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    icon: GitBranch,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
}: {
  photo: Polaroid;
  index: number;
}): ReactNode {
  const Icon = photo.icon;
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: photo.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="group relative aspect-[3/4.2] w-[clamp(7.5rem,12.5vw,10.5rem)] shrink-0 overflow-hidden rounded-2xl border border-foreground/12 bg-background p-2 shadow-xl transition-all duration-300 hover:z-20 hover:border-foreground/30 hover:shadow-2xl"
    >
      <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-b ${photo.accentGradient} p-3 border border-foreground/8`}>
        <DottedPattern className="absolute inset-0 opacity-35" />

        {/* Top Tag & Icon */}
        <div className="relative z-10 flex items-center justify-between">
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg border backdrop-blur-md ${photo.badgeBg}`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span className="text-[8.5px] font-bold tracking-wider text-foreground/50 uppercase">
            {photo.tag}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="relative z-10 flex flex-col gap-0.5 pt-4">
          <h4 className="text-[12.5px] font-semibold leading-snug tracking-tight text-foreground group-hover:text-foreground">
            {photo.title}
          </h4>
          <p className="text-[10px] leading-tight font-medium text-foreground/60">
            {photo.subtitle}
          </p>
        </div>

        {/* Bottom Accent Indicator */}
        <div className="relative z-10 mt-2 flex items-center justify-between border-t border-foreground/10 pt-2 text-[9px] font-mono text-foreground/40">
          <span>0{index + 1}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 group-hover:bg-sky-400 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div className="flex flex-wrap w-full items-start justify-center gap-1.5 px-4 sm:gap-2 sm:px-8">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}

