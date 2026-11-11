import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { buildJob } from "@/lib/kutora/command";
import { gradleKts, kotlinJob } from "@/lib/kutora/kotlin";
import { selectData, useStudio } from "@/lib/kutora/store";
import { Button, IssueList, SectionTitle, copyText, cx, downloadText } from "./controls";

type Tab = "shell" | "kotlin" | "gradle" | "plan";

export function KotlinPanel() {
  const data = useStudio(useShallow(selectData));
  const job = useMemo(() => buildJob(data), [data]);
  const kotlin = useMemo(() => kotlinJob(data, job), [data, job]);
  const gradle = useMemo(() => gradleKts(), []);
  const [tab, setTab] = useState<Tab>("kotlin");
  const [copied, setCopied] = useState("");

  const body = tab === "shell" ? job.shell : tab === "gradle" ? gradle : tab === "plan" ? "" : kotlin;
  const filename = tab === "shell" ? "kerf-job.sh" : tab === "gradle" ? "build.gradle.kts" : "KerfJob.kt";

  async function copy() {
    await copyText(tab === "plan" ? job.plan.map((step) => `${step.title}\n${step.body}`).join("\n\n") : body);
    setCopied(tab);
    window.setTimeout(() => setCopied(""), 1500);
  }

  return (
    <section>
      <SectionTitle
        index="05"
        title="Kotlin"
        body="导出的是一个能编译的 Kotlin 文件：它按你选的方式找到 ffmpeg，再用 ProcessBuilder 跑这条命令。不依赖第三方封装库。"
      />
      <IssueList issues={job.issues} />
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {(
          [
            ["kotlin", "KerfJob.kt"],
            ["gradle", "Gradle"],
            ["shell", "命令"],
            ["plan", "执行计划"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cx("min-h-11 shrink-0 px-3 text-sm", tab === id ? "bg-brass text-ink" : "border border-line text-bone")}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button tone="primary" onClick={() => void copy()}>
          {copied === tab ? "已复制" : "复制"}
        </Button>
        {tab !== "plan" ? (
          <Button onClick={() => downloadText(filename, body)}>下载 {filename}</Button>
        ) : null}
      </div>
      {tab === "plan" ? (
        <ol className="mt-4 flex flex-col gap-3">
          {job.plan.map((step, index) => (
            <li key={step.title} className="border border-line bg-ink-2 p-4">
              <div className="font-mono text-xs text-brass">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-1 font-medium text-bone">{step.title}</h3>
              <p className="mt-2 whitespace-pre-wrap font-mono text-sm text-mist">{step.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <pre className="mt-4 max-h-[32rem] overflow-auto border border-line bg-ink p-4 font-mono text-xs leading-relaxed text-bone">
          {body}
        </pre>
      )}
    </section>
  );
}
