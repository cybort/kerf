export function shellQuote(value: string): string {
  if (value.length === 0) return "''";
  if (/^[\w./:@%+=,~-]+$/.test(value)) return value;
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function ktString(value: string): string {
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\$/g, "\\$")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
  return `"${escaped}"`;
}

export function tokenize(input: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(input))) {
    out.push(match[1] ?? match[2] ?? match[3] ?? "");
  }
  return out;
}

export function shellJoin(argv: string[]): string {
  return argv.map(shellQuote).join(" ");
}

export function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}
