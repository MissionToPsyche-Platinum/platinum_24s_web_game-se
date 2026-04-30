import {
   getTubeLevelFromPack,
   isSourceConnectedToGoal,
   validateLevel,
} from "./tubePuzzleModel.js";
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

function renderGrid(level, metaLabel) {
	const { rows, cols, cells } = level;
	let html = `<div class="tube-puzzle" role="application" aria-label="Tube puzzle board">
  	<p class="tube-puzzle-caption"><strong>Tube puzzle</strong> — ${level.name}</p>
    <p class="tube-puzzle-mode">${metaLabel}</p>
  	<div class="tube-puzzle-grid" role="group" aria-label="Pipe tiles" aria-describedby="tube-puzzle-hint" style="--tube-rows:${rows};--tube-cols:${cols};">`;

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

	html += `</div><div class="tube-puzzle-flow-strip" aria-hidden="true"></div>
  	<div class="tube-puzzle-dpad" role="toolbar" aria-label="Move between pipes">
    	<span class="tube-puzzle-dpad-label">Move:</span>
    	<div class="tube-puzzle-dpad-buttons">
      	<button type="button" class="tube-dpad-btn" data-dr="-1" data-dc="0" aria-label="Move selection up">↑</button>
      	<button type="button" class="tube-dpad-btn" data-dr="1" data-dc="0" aria-label="Move selection down">↓</button>
      	<button type="button" class="tube-dpad-btn" data-dr="0" data-dc="-1" aria-label="Move selection left">←</button>
      	<button type="button" class="tube-dpad-btn" data-dr="0" data-dc="1" aria-label="Move selection right">→</button>
    	</div>
  	</div>
  	<p id="tube-puzzle-hint" class="tube-puzzle-hint">Click a pipe to rotate it. Use the buttons above or your <strong>keyboard’s arrow keys</strong> (↑↓←→) to move between pipes—empty tiles are skipped. Connect source to goal to win.</p></div>`;
	return html;
}

function setGridSolved(gridEl, solved) {
	gridEl.classList.toggle("tube-puzzle-grid--solved", solved);
	gridEl.querySelectorAll("button.tube-cell").forEach((btn) => {
    	btn.disabled = solved;
    	if (solved) {
        	btn.classList.remove("tube-cell--selected");
    	}
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

function setSelectedPipe(gridEl, tracker, btn) {
	if (tracker.selectedEl && tracker.selectedEl !== btn) {
    	tracker.selectedEl.classList.remove("tube-cell--selected");
	}
	if (btn && gridEl.contains(btn) && !btn.disabled) {
    	btn.classList.add("tube-cell--selected");
    	tracker.selectedEl = btn;
    	tracker.last = btn;
	}
}

function ensurePipeSelection(gridEl, tracker) {
	const ok =
    	tracker.last &&
    	gridEl.contains(tracker.last) &&
    	!tracker.last.disabled;
	if (ok) {
    	return tracker.last;
	}
	const pipe = gridEl.querySelector("button.tube-cell:not([disabled])");
	if (pipe) {
    	setSelectedPipe(gridEl, tracker, pipe);
	}
	return pipe;
}

function movePipeFocus(gridEl, rows, cols, dr, dc, tracker) {
	ensurePipeSelection(gridEl, tracker);
	const el = document.activeElement;
	let cur = null;
	if (
    	el &&
    	el.tagName === "BUTTON" &&
    	el.classList.contains("tube-cell") &&
    	gridEl.contains(el) &&
    	!el.disabled
	) {
    	cur = el;
	} else if (tracker.last && gridEl.contains(tracker.last) && !tracker.last.disabled) {
    	cur = tracker.last;
	} else {
    	cur = gridEl.querySelector("button.tube-cell:not([disabled])");
	}
	if (!cur) {
    	return;
	}
	let nr = Number(cur.dataset.r) + dr;
	let nc = Number(cur.dataset.c) + dc;
	while (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
    	const next = gridEl.querySelector(`button.tube-cell[data-r="${nr}"][data-c="${nc}"]`);
    	if (next && !next.disabled) {
        	setSelectedPipe(gridEl, tracker, next);
        	next.focus({ preventScroll: true });
        	return;
    	}
    	nr += dr;
    	nc += dc;
	}
}

function wireKeyboardNav(gridEl, rows, cols, tracker) {
	const arrows = {
    	ArrowUp: [-1, 0],
    	ArrowDown: [1, 0],
    	ArrowLeft: [0, -1],
    	ArrowRight: [0, 1],
	};
	gridEl.addEventListener(
    	"keydown",
    	(e) => {
        	const delta = arrows[e.key];
        	if (!delta) {
            	return;
        	}
        	const el = document.activeElement;
        	if (
            	!el ||
            	el.tagName !== "BUTTON" ||
            	!el.classList.contains("tube-cell") ||
            	!gridEl.contains(el) ||
            	el.disabled
        	) {
            	return;
        	}
        	e.preventDefault();
        	movePipeFocus(gridEl, rows, cols, delta[0], delta[1], tracker);
    	},
    	true,
	);
}

function wireDpad(container, gridEl, rows, cols, tracker) {
	container.querySelectorAll(".tube-dpad-btn").forEach((b) => {
    	b.addEventListener("mousedown", (e) => {
        	e.preventDefault();
    	});
    	b.addEventListener("click", () => {
        	const dr = Number(b.dataset.dr);
        	const dc = Number(b.dataset.dc);
        	movePipeFocus(gridEl, rows, cols, dr, dc, tracker);
    	});
	});
}

function wireRotation(gridEl, level, state, tracker) {
	gridEl.addEventListener("click", (e) => {
    	const btn = e.target.closest("button.tube-cell");
    	if (!btn || btn.disabled || !gridEl.contains(btn)) {
        	return;
    	}
    	setSelectedPipe(gridEl, tracker, btn);
    	btn.focus({ preventScroll: true });
    	const r = Number(btn.dataset.r);
    	const c = Number(btn.dataset.c);
    	const cell = level.cells[r][c];
    	cell.rotation = (cell.rotation + 1) % 4;
    	const label = `${cell.kind}, rotation ${cell.rotation}`;
    	btn.innerHTML = cellSvg(cell.kind, cell.rotation);
    	btn.setAttribute("aria-label", label);
    	btn.title = label;
    	btn.focus({ preventScroll: true });
    	tryWin(level, gridEl, state);
	});
}

export function startTubePuzzle({ containerID }) {
   const picked = getTubeLevelFromPack();
   const template = picked.level;
     if (!validateLevel(template)) {
       throw new Error("Invalid tube level template");
   }
   const difficultyLabel = picked.difficulty === "challenge" ? "Challenge" : "Normal";
   const metaLabel = `Mode: ${difficultyLabel}. Level ${picked.index + 1}/${picked.total}. Change in Settings → Difficulty for timed runs.`;
   const ph = document.getElementById("puzzle-header");
	if (ph) {
    	ph.textContent = "Tube Puzzle";
	}

    const level = cloneLevel(template);
	const winState = { won: false };

	containerID.innerHTML = `
       <div class="tube-puzzle-layout">
            ${renderGrid(level, metaLabel)}
    	</div>
	`;

	const grid = containerID.querySelector(".tube-puzzle-grid");
	const layout = containerID.querySelector(".tube-puzzle-layout");
	const tracker = { last: null, selectedEl: null };

	if (grid && layout) {
    	const firstPipe = grid.querySelector("button.tube-cell:not([disabled])");
    	if (firstPipe) {
        	setSelectedPipe(grid, tracker, firstPipe);
        	firstPipe.focus({ preventScroll: true });
    	}
    	wireKeyboardNav(grid, level.rows, level.cols, tracker);
    	wireDpad(layout, grid, level.rows, level.cols, tracker);
    	wireRotation(grid, level, winState, tracker);
    	tryWin(level, grid, winState);
	}
}
