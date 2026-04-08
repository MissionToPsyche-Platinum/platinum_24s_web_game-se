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
