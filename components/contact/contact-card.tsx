import { Mail, Phone, Github, Linkedin } from "lucide-react";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3}/>
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[32ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px] mb-6">
                  I&rsquo;m always open to discussing new projects, internship opportunities, or AI & full-stack ideas. Feel free to reach out!
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                <div className="flex flex-col gap-3 w-full">
                  <a href="mailto:samayshrey.p@gmail.com" className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-3 text-[14px] text-foreground font-medium hover:bg-foreground/10 transition-colors">
                    <Mail className="h-4 w-4 text-rose-500" />
                    <span>samayshrey.p@gmail.com</span>
                  </a>
                  <a href="tel:+917894106734" className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-3 text-[14px] text-foreground font-medium hover:bg-foreground/10 transition-colors">
                    <Phone className="h-4 w-4 text-emerald-500" />
                    <span>+91 78941 06734</span>
                  </a>
                  <a href="https://github.com/samayshrey-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-3 text-[14px] text-foreground font-medium hover:bg-foreground/10 transition-colors">
                    <Github className="h-4 w-4 text-sky-400" />
                    <span>github.com/samayshrey-dev</span>
                  </a>
                  <a href="https://www.linkedin.com/in/samayshrey-patnaik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-3 text-[14px] text-foreground font-medium hover:bg-foreground/10 transition-colors">
                    <Linkedin className="h-4 w-4 text-blue-500" />
                    <span>linkedin.com/in/samayshrey-patnaik</span>
                  </a>
                </div>

                <div className="flex flex-col items-center gap-1 text-center pt-2">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    2026 &copy; Samayshrey Patnaik
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/45">
                    Chennai, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
