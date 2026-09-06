// Dirs: N=0,E=1,S=2,W=3. rotation = quarter-turns clockwise (0–3).
const turn = (d, r) => (d + r) % 4;

// Open sides at rotation 0 (before turning the piece).
const OPEN = {
    empty: [],
    straight: [0, 2],
    corner: [0, 1],
    tee: [0, 1, 2],
    cross: [0, 1, 2, 3],
    source: [2],
    goal: [0],
};

export function getOpenDirections(kind, rotation) {
    return (OPEN[kind] || []).map((d) => turn(d, rotation));
}

/** Neighbor delta [dr, dc] for N,E,S,W — for later path checks */
export const DELTA = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const c = (kind, rotation = 0) => ({ kind, rotation: rotation % 4 });

export const DEFAULT_LEVEL = {
    id: "flow-intro-01",
    name: "First flow",
    rows: 5,
    cols: 5,
    cells: [
        [c("empty"), c("empty"), c("source"), c("empty"), c("empty")],
        [c("empty"), c("empty"), c("straight"), c("empty"), c("empty")],
        [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
        [c("empty"), c("empty"), c("straight"), c("empty"), c("empty")],
        [c("empty"), c("empty"), c("goal"), c("empty"), c("empty")],
    ],
};

export const NORMAL_LEVEL_2 = {
   id: "flow-normal-02",
   name: "Corner hop",
   rows: 5,
   cols: 5,
   cells: [
       [c("empty"), c("empty"), c("source"), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("corner", 1), c("straight", 1), c("corner")],
       [c("empty"), c("empty"), c("empty"), c("corner", 2), c("corner")],
       [c("empty"), c("empty"), c("empty"), c("straight", 1), c("empty")],
       [c("empty"), c("empty"), c("empty"), c("goal"), c("empty")],
   ],
};

export const NORMAL_LEVEL_3 = {
   id: "flow-normal-03",
   name: "Mini zigzag",
   rows: 5,
   cols: 5,
   cells: [
       [c("empty"), c("source"), c("corner", 2), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("corner", 0), c("corner", 1), c("empty")],
       [c("empty"), c("empty"), c("empty"), c("corner", 3), c("corner", 1)],
       [c("empty"), c("empty"), c("empty"), c("empty"), c("straight", 1)],
       [c("empty"), c("empty"), c("empty"), c("empty"), c("goal")],
   ],
};

/** Longer column: more straights to align; all start horizontal so path is broken until fixed. */
export const CHALLENGE_LEVEL = {
   id: "flow-challenge-01",
   name: "Deep line",
   rows: 7,
   cols: 5,
   cells: [
       [c("empty"), c("empty"), c("source"), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("straight", 1), c("empty"), c("empty")],
       [c("empty"), c("empty"), c("goal"), c("empty"), c("empty")],
   ],
};

/** Winding path: a "snake" that requires corners/straights to connect. */
export const SNAKE_LEVEL = {
   id: "flow-challenge-snake-01",
   name: "Snake run",
   rows: 5,
   cols: 5,
   cells: [
       // Solvable winding path. Solution path:
       // source (0,0) ↓ to (4,0) → to (4,3) ↑ to (2,3) → to (2,4) ↓ to goal (4,4)
       //
       // Many pieces start rotated (scrambled), so the player must click to rotate.
       [c("source"), c("empty"), c("empty"), c("empty"), c("empty")],
       [c("straight", 1), c("empty"), c("empty"), c("empty"), c("empty")],
       [c("straight", 1), c("empty"), c("empty"), c("corner", 3), c("corner", 1)],
       [c("straight", 1), c("empty"), c("empty"), c("straight", 1), c("straight", 1)],
       [c("corner", 2), c("straight", 1), c("straight", 1), c("corner", 0), c("goal")],
   ],
};

const LEVEL_PACKS = {
   normal: [DEFAULT_LEVEL, NORMAL_LEVEL_2, NORMAL_LEVEL_3],
   challenge: [CHALLENGE_LEVEL, SNAKE_LEVEL],
};

export function getTubeLevelFromPack() {
   const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
   const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";
   const pack = LEVEL_PACKS[difficulty];

   // Rotate through the pack deterministically so players see all levels.
   const key = `pysche_tube_level_index_${difficulty}`;
   const raw = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
   const prev = raw ? Number(raw) : 0;
   const idx = Number.isFinite(prev) ? prev % pack.length : 0;
   const next = (idx + 1) % pack.length;
   if (typeof localStorage !== "undefined") localStorage.setItem(key, String(next));
  
   return { level: pack[idx], difficulty, index: idx, total: pack.length };
}

export function validateLevel(level) {
    if (!level?.cells || level.rows !== level.cells.length) {
        return false;
    }
    return level.cells.every((row) => row && row.length === level.cols);
}

const opp = (d) => (d + 2) % 4;

/** World-space open directions (N=0…W=3) that currently meet a matching neighbor. */
export function getConnectedDirections(level, r, c) {
    const cell = level.cells[r]?.[c];
    if (!cell || cell.kind === "empty") {
        return [];
    }
    const linked = [];
    for (const d of getOpenDirections(cell.kind, cell.rotation)) {
        const nr = r + DELTA[d][0];
        const nc = c + DELTA[d][1];
        if (nr < 0 || nr >= level.rows || nc < 0 || nc >= level.cols) {
            continue;
        }
        const ncell = level.cells[nr][nc];
        if (!ncell || ncell.kind === "empty") {
            continue;
        }
        if (getOpenDirections(ncell.kind, ncell.rotation).includes(opp(d))) {
            linked.push(d);
        }
    }
    return linked;
}

/** BFS from source through currently connected open edges; returns "r,c" cell keys. */
export function getCellsConnectedToSource(level) {
  const { rows, cols, cells } = level;
  let sr = -1;
  let sc = -1;
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
          if (cells[r][c].kind === "source") {
              sr = r;
              sc = c;
          }
      }
  }
  if (sr < 0) return new Set();


  const key = (r, c) => `${r},${c}`;
  const seen = new Set([key(sr, sc)]);
  const q = [[sr, sc]];
  while (q.length > 0) {
      const [r, c] = q.shift();
      const cell = cells[r][c];
      for (const d of getOpenDirections(cell.kind, cell.rotation)) {
          const nr = r + DELTA[d][0];
          const nc = c + DELTA[d][1];
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          const ncell = cells[nr][nc];
          if (!getOpenDirections(ncell.kind, ncell.rotation).includes(opp(d))) continue;
          const k = key(nr, nc);
          if (seen.has(k)) continue;
          seen.add(k);
          q.push([nr, nc]);
      }
  }
  return seen;
}

/** BFS along open pipe edges; true if source cell links to goal cell. */
export function isSourceConnectedToGoal(level) {
   const { rows, cols, cells } = level;
   let sr = -1;
   let sc = -1;
   let gr = -1;
   let gc = -1;
   for (let r = 0; r < rows; r++) {
       for (let c = 0; c < cols; c++) {
           const k = cells[r][c].kind;
           if (k === "source") {
               sr = r;
               sc = c;
           }
           if (k === "goal") {
               gr = r;
               gc = c;
           }
       }
   }
   if (sr < 0 || gr < 0) {
       return false;
   }
   const key = (r, c) => `${r},${c}`;
   const seen = new Set();
   const q = [[sr, sc]];
   seen.add(key(sr, sc));
   while (q.length > 0) {
       const [r, c] = q.shift();
       if (r === gr && c === gc) {
           return true;
       }
       const cell = cells[r][c];
       for (const d of getOpenDirections(cell.kind, cell.rotation)) {
           const nr = r + DELTA[d][0];
           const nc = c + DELTA[d][1];
           if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
               continue;
           }
           const need = opp(d);
           const ncell = cells[nr][nc];
           if (!getOpenDirections(ncell.kind, ncell.rotation).includes(need)) {
               continue;
           }
           const k = key(nr, nc);
           if (seen.has(k)) {
               continue;
           }
           seen.add(k);
           q.push([nr, nc]);
       }
   }
   return false;
}
