import { DEFAULT_LEVEL, validateLevel } from "./tubePuzzleModel.js";

const STROKE = "#302144";
const ACCENT = "#f9a000";

/** SVG fragments at rotation 0; group is rotated by rotation × 90° */
const SHAPES = {
    empty: `<circle cx="50" cy="50" r="3" fill="#999" opacity="0.35"/>`,
    straight: `<line x1="50" y1="8" x2="50" y2="92" stroke="${STROKE}" stroke-width="10" stroke-linecap="round"/>`,
    corner: `<path d="M 50 8 L 50 50 L 92 50" fill="none" stroke="${STROKE}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
    tee: `<path d="M 50 8 L 50 92 M 50 50 L 92 50" fill="none" stroke="${STROKE}" stroke-width="10" stroke-linecap="round"/>`,
    cross: `<line x1="50" y1="8" x2="50" y2="92" stroke="${STROKE}" stroke-width="9"/><line x1="8" y1="50" x2="92" y2="50" stroke="${STROKE}" stroke-width="9"/>`,
    source: `<circle cx="50" cy="36" r="14" fill="${ACCENT}" stroke="${STROKE}" stroke-width="3"/><line x1="50" y1="50" x2="50" y2="92" stroke="${STROKE}" stroke-width="10" stroke-linecap="round"/>`,
    goal: `<line x1="50" y1="8" x2="50" y2="42" stroke="${STROKE}" stroke-width="10" stroke-linecap="round"/><path d="M 26 48 Q 50 90 74 48" fill="none" stroke="${STROKE}" stroke-width="8" stroke-linecap="round"/>`,
};

function cellSvg(kind, rotation) {
    const inner = SHAPES[kind] ?? SHAPES.empty;
    const deg = rotation * 90;
    return `<svg class="tube-cell-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(${deg} 50 50)">${inner}</g></svg>`;
}

function renderGrid(level) {
    const { rows, cols, cells } = level;
    let html = `<div class="tube-puzzle" role="application" aria-label="Tube puzzle board">
      <p class="tube-puzzle-caption"><strong>Tube puzzle</strong> — ${level.name}</p>
      <div class="tube-puzzle-grid" style="--tube-rows:${rows};--tube-cols:${cols};">`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = cells[r][c];
            const label = `${cell.kind}, rotation ${cell.rotation}`;
            html += `<div class="tube-cell tube-cell--${cell.kind}" data-r="${r}" data-c="${c}" title="${label}" role="img" aria-label="${label}">`;
            html += cellSvg(cell.kind, cell.rotation);
            html += `</div>`;
        }
    }

    html += `</div><div class="tube-puzzle-flow-strip" aria-hidden="true"></div><p class="tube-puzzle-hint">Rotate pieces to connect source to goal (interaction coming next).</p></div>`;
    return html;
}

export function startTubePuzzle({ containerID }) {
    if (!validateLevel(DEFAULT_LEVEL)) {
        throw new Error("Invalid default tube level");
    }

    const ph = document.getElementById("puzzle-header");
    if (ph) {
        ph.textContent = "Tube Puzzle";
    }

    containerID.innerHTML = `
        <div id="puzzle-layout" class="tube-puzzle-layout">
            ${renderGrid(DEFAULT_LEVEL)}
        </div>
    `;
}
