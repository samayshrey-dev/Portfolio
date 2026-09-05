import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  score?: string;
};

const ENTRIES: Entry[] = [
  {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech in Computer Science Engineering (3rd Year)",
    period: "Expected 2028",
    location: "Chennai, India",
    score: "CGPA: 8.51 / 10.00",
  },
  {
    school: "Resonance Junior College",
    degree: "Class XII (Senior Secondary)",
    period: "2024",
    location: "Hyderabad, Telangana, India",
    score: "68.7%",
  },
  {
    school: "Kaanger Valley Academy",
    degree: "Class X (Secondary School)",
    period: "2022",
    location: "Raipur, Chhattisgarh, India",
    score: "82.6%",
  },
];

const ROW_HEIGHT = 72;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center justify-between gap-4 rounded-3xl border p-4"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <div className="flex items-center gap-4">
                <SchoolLogo entry={entry} />
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.school}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.degree}
                    <span className="text-foreground/30 mx-2">•</span>
                    <span className="text-foreground/55">{entry.location}</span>
                  </span>
                </div>
              </div>

              {entry.score && (
                <span className="shrink-0 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
                  {entry.score}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.school.charAt(0);
  return (
    <span
      className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border bg-foreground/5"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <span className="text-foreground/80 text-[18px] font-semibold tracking-tight">
        {initials}
      </span>
    </span>
  );
}
