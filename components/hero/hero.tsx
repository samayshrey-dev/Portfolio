import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";

const PORTRAIT_SRC = "/samayshrey.jpg";
const PORTRAIT_HOVER_SRC = "/samayshrey.jpg";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Samayshrey Patnaik
            </p>

            <h1 className="text-[2.25rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.35rem]">
              <span className="block">
                Full-Stack &
              </span>
              <span className="block">AI Application Developer</span>
            </h1>

            <p className="max-w-[38ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65">
              Third-year Computer Science Engineering student at SRMIST focused on high-performance web applications, API architectures, and AI-driven solutions.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt="Samayshrey Patnaik portrait"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
