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

export function validateLevel(level) {
    if (!level?.cells || level.rows !== level.cells.length) {
        return false;
    }
    return level.cells.every((row) => row && row.length === level.cols);
}

const opp = (d) => (d + 2) % 4;

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
