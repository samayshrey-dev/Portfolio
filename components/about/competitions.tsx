import type { ReactNode } from "react";
import { Award, Trophy, Music } from "lucide-react";

export function Competitions(): ReactNode {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Hackathons & Competitions */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-foreground">
            <Trophy className="h-4 w-4 text-amber-400" />
            Hackathons & Competitions
          </h3>
          <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-4">
            <ul className="flex flex-col gap-2.5">
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">SRM Hackathon | NitroStack × WeKan</span>
                <span className="text-[13px] text-amber-400 font-medium">Finalist — Aug 2026</span>
              </li>
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">Hack The Knight (DayZero 2.0) | CodeNex</span>
                <span className="text-[13px] text-amber-400 font-medium">Finalist — Apr 2026</span>
              </li>
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">Pentathon 2.0 – Ideathon | NextGen AI</span>
                <span className="text-[13px] text-amber-400 font-medium">Second Round Qualifier — Mar 2025</span>
              </li>
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">Project Expo (AI)</span>
                <span className="text-[13px] text-sky-400 font-medium">Featured Project & Best PPT Presentation — 2026</span>
              </li>
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">Think For Bharat 1.0 | CodeCapitalCoffee × Unstop</span>
                <span className="text-[13px] text-foreground/55 font-medium">Participant — Jun 2026</span>
              </li>
              <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-foreground">Tata Crucible Campus Quiz | Tata Group</span>
                <span className="text-[13px] text-foreground/55 font-medium">Participant — Jul 2025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications & Co-Curricular */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-foreground">
              <Award className="h-4 w-4 text-sky-400" />
              Certifications & Training
            </h3>
            <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-4">
              <ul className="flex flex-col gap-2">
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-foreground">AI Tools & ChatGPT Workshop</span>
                  <span className="text-[12px] text-sky-400 font-medium">be10x (Jul 2026)</span>
                </li>
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-foreground">Software Engineer Intern Certification</span>
                  <span className="text-[12px] text-sky-400 font-medium">HackerRank (Jul 2026)</span>
                </li>
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-foreground">Python (Basic) Skill Certification</span>
                  <span className="text-[12px] text-sky-400 font-medium">HackerRank (Jun 2026)</span>
                </li>
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-foreground">DevOps 101: Build, Test, Deploy & Monitor</span>
                  <span className="text-[12px] text-foreground/55 font-medium">Training</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-foreground">
              <Music className="h-4 w-4 text-pink-400" />
              Co-Curricular Highlights
            </h3>
            <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-4">
              <ul className="flex flex-col gap-2">
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 text-[14px] text-foreground/80">
                  <strong className="text-foreground">Music Band Member</strong>: Active member of music band; inter-college live performances.
                </li>
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 text-[14px] text-foreground/80">
                  <strong className="text-foreground">3rd Place National Music Competition</strong> at SRMIST.
                </li>
                <li className="bg-background border-foreground/5 rounded-2xl border p-3 text-[14px] text-foreground/80">
                  <strong className="text-foreground">Dance Competitions Winner</strong> & Runner-Up position at VIT.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
