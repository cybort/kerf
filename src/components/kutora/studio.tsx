import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { buildJob } from "@/lib/kutora/command";
import { selectData, useStudio } from "@/lib/kutora/store";
import { EnginePanel } from "./engine-panel";
import { FiltersPanel } from "./filters-panel";
import { JobPanel } from "./job-panel";
import { KotlinPanel } from "./kotlin-panel";
import { ParamsPanel } from "./params-panel";
import { copyText, cx } from "./controls";

const NAV = [
  { id: "engine", label: "引擎" },
  { id: "job", label: "作业" },
  { id: "params", label: "参数" },
  { id: "filters", label: "滤镜" },
  { id: "kotlin", label: "Kotlin" },
] as const;

type SectionId = (typeof NAV)[number]["id"];

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 text-brass" aria-hidden="true">
      <rect x="2.5" y="2.5" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 24 L15 8 H20 L12 24 Z" fill="currentColor" />
      <path d="M19 8 H26 V13 H22.5 L19 8 Z" fill="currentColor" />
    </svg>
  );
}

export function Studio() {
  const [section, setSection] = useState<SectionId>("engine");
  const [dockOpen, setDockOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const data = useStudio(useShallow(selectData));
  const job = useMemo(() => buildJob(data), [data]);
  const errors = job.issues.filter((issue) => issue.level === "error").length;

  useEffect(() => {
    const pending = useStudio.persist.rehydrate();
    if (pending && typeof (pending as Promise<void>).then === "function") {
      void (pending as Promise<void>).then(() => useStudio.getState().markHydrated());
    } else {
      useStudio.getState().markHydrated();
    }
  }, []);

  const line = job.shell
    .split("\n")
    .filter((item) => item && !item.startsWith("#"))
    .join(" ");

  return (
    <div className="min-h-dvh bg-ink text-bone">
      <div className="md:grid md:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="border-b border-line md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:border-r md:border-b-0">
          <div className="flex items-center gap-3 px-4 py-4">
            <Mark />
            <div>
              <div className="text-lg font-semibold leading-none">刃帧</div>
              <div className="mt-1 font-mono text-xs tracking-widest text-mist">KERF</div>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:px-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                aria-current={section === item.id ? "page" : undefined}
                className={cx(
                  "min-h-11 shrink-0 px-3 text-left text-sm",
                  section === item.id ? "bg-brass text-ink" : "text-bone",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <p className="hidden px-4 pb-4 text-xs leading-relaxed text-mist md:mt-auto md:block">
            配置留在这台浏览器里。转码发生在你自己的 Kotlin 进程中。
          </p>
        </aside>

        <div className="min-w-0">
          <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pt-5 pb-28">
            {section === "engine" ? <EnginePanel /> : null}
            {section === "job" ? <JobPanel /> : null}
            {section === "params" ? <ParamsPanel /> : null}
            {section === "filters" ? <FiltersPanel /> : null}
            {section === "kotlin" ? <KotlinPanel /> : null}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-3 py-2 md:px-4">
          <button type="button" className="min-h-11 shrink-0 px-2 text-left" onClick={() => setDockOpen((open) => !open)}>
            <span className="block font-mono text-xs text-brass">{errors ? `${errors} 个错误` : "命令"}</span>
            <span className="block text-sm text-bone">{dockOpen ? "收起" : "展开"}</span>
          </button>
          <p className="min-w-0 flex-1 truncate font-mono text-xs text-mist">{line}</p>
          <button
            type="button"
            className="min-h-11 shrink-0 bg-brass px-3 text-sm font-medium text-ink"
            onClick={() => {
              void copyText(job.shell).then(() => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              });
            }}
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        {dockOpen ? (
          <pre className="mx-auto max-h-48 w-full max-w-5xl overflow-auto px-4 pb-3 font-mono text-xs leading-relaxed text-bone">
            {job.shell}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
