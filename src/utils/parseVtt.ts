export interface VttCue {
  start: number;
  end: number;
  text: string;
}

const timeToSeconds = (t: string): number => {
  const parts = t.trim().split(":").map(Number);
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }
  const [m, s] = parts;
  return m * 60 + s;
};

// Minimal WebVTT parser for plain-dialogue caption files (no styling cues,
// no nested tags) — exactly what the transcript pipeline produces. Good
// enough for a custom caption overlay; not a general-purpose VTT parser.
export function parseVtt(vttText: string): VttCue[] {
  const cues: VttCue[] = [];
  const blocks = vttText.replace(/\r/g, "").split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    const timingLine = lines.find((l) => l.includes("-->"));
    if (!timingLine) continue;

    const [startRaw, endRaw] = timingLine.split("-->").map((s) => s.trim().split(" ")[0]);
    const start = timeToSeconds(startRaw);
    const end = timeToSeconds(endRaw);
    const textLines = lines.slice(lines.indexOf(timingLine) + 1);
    const text = textLines.join(" ").trim();
    if (text) cues.push({ start, end, text });
  }

  return cues;
}

export function cueAt(cues: VttCue[], time: number): VttCue | null {
  return cues.find((c) => time >= c.start && time <= c.end) ?? null;
}
