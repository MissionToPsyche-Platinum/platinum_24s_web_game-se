import { DEFAULT_LEVEL, isSourceConnectedToGoal, validateLevel } from "./tubePuzzleModel.js";
import { solvePuzzle } from "../gameController.js";

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

function cloneLevel(level) {
   return {
       id: level.id,
       name: level.name,
       rows: level.rows,
       cols: level.cols,
       cells: level.cells.map((row) => row.map((cell) => ({ ...cell }))),
   };
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
           const svg = cellSvg(cell.kind, cell.rotation);
           if (cell.kind === "empty") {
               html += `<div class="tube-cell tube-cell--empty" data-r="${r}" data-c="${c}" aria-hidden="true">${svg}</div>`;
           } else {
               html += `<button type="button" class="tube-cell tube-cell--${cell.kind}" data-r="${r}" data-c="${c}" title="${label}" aria-label="${label}">${svg}</button>`;
           }
       }
   }

   html += `</div><div class="tube-puzzle-flow-strip" aria-hidden="true"></div><p class="tube-puzzle-hint">Click a pipe to rotate it clockwise. Connect source to goal to win.</p></div>`;
   return html;
}

function setGridSolved(gridEl, solved) {
   gridEl.classList.toggle("tube-puzzle-grid--solved", solved);
   gridEl.querySelectorAll("button.tube-cell").forEach((btn) => {
       btn.disabled = solved;
   });
}

function tryWin(level, gridEl, state) {
   if (state.won || !isSourceConnectedToGoal(level)) {
       return;
   }
   state.won = true;
   setGridSolved(gridEl, true);
   solvePuzzle();
}

function wireRotation(gridEl, level, state) {
   gridEl.addEventListener("click", (e) => {
       const btn = e.target.closest("button.tube-cell");
       if (!btn || btn.disabled || !gridEl.contains(btn)) {
           return;
       }
       const r = Number(btn.dataset.r);
       const c = Number(btn.dataset.c);
       const cell = level.cells[r][c];
       cell.rotation = (cell.rotation + 1) % 4;
       const label = `${cell.kind}, rotation ${cell.rotation}`;
       btn.innerHTML = cellSvg(cell.kind, cell.rotation);
       btn.setAttribute("aria-label", label);
       btn.title = label;
       tryWin(level, gridEl, state);
   });
}

export function startTubePuzzle({ containerID }) {
   if (!validateLevel(DEFAULT_LEVEL)) {
       throw new Error("Invalid default tube level");
   }

   const ph = document.getElementById("puzzle-header");
   if (ph) {
       ph.textContent = "Tube Puzzle";
   }

   const level = cloneLevel(DEFAULT_LEVEL);
   const winState = { won: false };

    containerID.innerHTML = `
       <div id="puzzle-layout" class="tube-puzzle-layout">
           ${renderGrid(level)}
       </div>
   `;

   const grid = containerID.querySelector(".tube-puzzle-grid");
   if (grid) {
       wireRotation(grid, level, winState);
       tryWin(level, grid, winState);
   }
}
