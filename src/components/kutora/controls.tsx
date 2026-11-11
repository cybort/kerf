import type { ReactNode } from "react";
import type { Issue } from "@/lib/kutora/types";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function matchesQuery(query: string, text: string): boolean {
  const needle = query.trim().toLowerCase();
  return !needle || text.toLowerCase().includes(needle);
}

export function Field({
  query,
  flag,
  label,
  help,
  children,
}: {
  query: string;
  flag: string;
  label: string;
  help: string;
  children: ReactNode;
}) {
  if (!matchesQuery(query, `${flag} ${label} ${help}`)) return null;
  return (
    <div className="flex flex-col gap-3 border-b border-line py-4 md:flex-row md:gap-8">
      <div className="md:w-64 md:shrink-0">
        <div className="font-medium text-bone">{label}</div>
        <div className="mt-1 font-mono text-xs text-brass">{flag}</div>
        <p className="mt-2 text-sm text-pretty text-mist">{help}</p>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cx(mono && "font-mono text-sm")}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const list = options.some((option) => option.value === value) || value === ""
    ? options
    : [{ value, label: value }, ...options];
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {list.map((option) => (
        <option key={option.value || "empty"} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-11 items-center gap-3 text-left"
    >
      <span className={cx("relative h-6 w-11 shrink-0 rounded-full border border-line", checked ? "bg-brass" : "bg-ink")}>
        <span
          className={cx(
            "absolute top-0.5 size-5 rounded-full",
            checked ? "left-5 bg-ink" : "left-0.5 bg-mist",
          )}
        />
      </span>
      <span className="text-sm text-bone">{label}</span>
    </button>
  );
}

export function Button({
  children,
  onClick,
  tone = "ghost",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "ghost" | "primary" | "danger";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "min-h-11 px-3 text-sm font-medium disabled:opacity-40",
        tone === "primary" && "bg-brass text-ink",
        tone === "ghost" && "border border-line text-bone",
        tone === "danger" && "border border-line text-ember",
      )}
    >
      {children}
    </button>
  );
}

export function IssueList({ issues }: { issues: Issue[] }) {
  if (!issues.length) {
    return <p className="text-sm text-brass">检查通过，没有阻塞项。</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {issues.map((issue, index) => (
        <li key={`${issue.level}-${index}`} className="border border-line bg-ink-2 px-3 py-2 text-sm text-bone">
          <span className="mr-2 font-mono text-xs text-ember">{issue.level === "error" ? "错误" : "注意"}</span>
          <span className="break-words">{issue.message}</span>
        </li>
      ))}
    </ul>
  );
}

export function SectionTitle({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <header className="mb-4">
      <div className="font-mono text-xs text-brass">{index}</div>
      <h2 className="mt-1 text-2xl font-semibold text-bone">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-pretty text-mist">{body}</p>
    </header>
  );
}

export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
