// What the Elevator Would Say — one funny line a talking elevator
// would say, written to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text of 1 to 120 characters, not only
// whitespace, single line. The program writes the line with no
// trailing newline, so every character in the file is the entry.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line, in the elevator's own voice:
// "Going up. Going down." is the elevator announcing itself — its
// whole job in four words — before the turn: it has watched the
// passenger rehearse a breakup speech for three floors, and wishes
// them luck. The joke lands on the first read, needs no setup, and
// could come from no other machine: only an elevator rides along
// with you floor after floor while you practise what to say.
const LINE =
  "Going up. Going down. I have watched you rehearse your breakup speech for three floors now. Good luck.";

// Gate check, mirroring RULES.txt exactly: 1-120 characters, a
// single line (no newline characters at all), not only whitespace.
if (LINE.length < 1 || LINE.length > 120) {
  console.error(`entry must be 1-120 characters, got ${LINE.length}`);
  process.exit(1);
}
if (/\n|\r/.test(LINE)) {
  console.error('entry must be a single line');
  process.exit(1);
}
if (!LINE.trim()) {
  console.error('entry must not be only whitespace');
  process.exit(1);
}

// Write the line exactly, with no trailing newline, so the file's
// byte count is the entry's character count.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
console.log(LINE);
