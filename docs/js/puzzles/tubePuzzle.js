import {
   getCellsConnectedToSource,
   getConnectedDirections,
   getOpenDirections,
   getTubeLevelFromPack,
   isSourceConnectedToGoal,
   validateLevel,
} from "./tubePuzzleModel.js";
import { solvePuzzle } from "../gameController.js";

const STROKE = "#302144";
const ACCENT = "#f9a000";
const FLOW = "#1a8cff";
const PORT_POS = [
	[50, 10],
	[90, 50],
	[50, 90],
	[10, 50],
];

function isColorBlindMode() {
	return !!window.getPyscheSettings?.()?.colorBlind;
}

function pipeStrokeAttrs(stroke, width, extra = "") {
	return `fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${extra}`;
}

function pipeCore(kind, stroke, width) {
	const a = pipeStrokeAttrs(stroke, width);
	switch (kind) {
		case "straight":
			return `<line class="tube-pipe-core" x1="50" y1="8" x2="50" y2="92" ${a}/>`;
		case "corner":
			return `<path class="tube-pipe-core" d="M 50 8 L 50 50 L 92 50" ${a}/>`;
		case "tee":
			return `<path class="tube-pipe-core" d="M 50 8 L 50 92 M 50 50 L 92 50" ${a}/>`;
		case "cross":
			return `<line class="tube-pipe-core" x1="50" y1="8" x2="50" y2="92" ${a}/><line class="tube-pipe-core" x1="8" y1="50" x2="92" y2="50" ${a}/>`;
		case "source":
			return `<line class="tube-pipe-core" x1="50" y1="50" x2="50" y2="92" ${a}/>`;
		case "goal":
			return `<line class="tube-pipe-core" x1="50" y1="8" x2="50" y2="42" ${a}/>`;
		default:
			return "";
	}
}

function sourceGoalMarks(kind, colorBlind) {
	if (kind === "source") {
		const fill = colorBlind ? "#111" : ACCENT;
		return `<circle cx="50" cy="36" r="14" fill="${fill}" stroke="${STROKE}" stroke-width="3"/>`;
	}
	if (kind === "goal") {
		return `<path d="M 26 48 Q 50 90 74 48" fill="none" stroke="${STROKE}" stroke-width="8" stroke-linecap="round"/>`;
	}
	return "";
}

function cellLetter(kind, colorBlind, rotation) {
	if (!colorBlind) {
		return "";
	}
	const deg = rotation * 90;
	if (kind === "source") {
		return `<g transform="rotate(${-deg} 50 36)"><text class="tube-cell-letter tube-cell-letter--on-dark" x="50" y="36" text-anchor="middle" dominant-baseline="middle">S</text></g>`;
	}
	if (kind === "goal") {
		return `<g transform="rotate(${-deg} 50 68)"><text class="tube-cell-letter" x="50" y="68" text-anchor="middle" dominant-baseline="middle">G</text></g>`;
	}
	return "";
}

function portMarkers(kind, rotation, connectedDirs) {
	const linked = new Set(connectedDirs);
	return getOpenDirections(kind, rotation)
		.map((d) => {
			const [x, y] = PORT_POS[d];
			if (linked.has(d)) {
				return `<polygon class="tube-port tube-port--linked" points="${x},${y - 6} ${x + 6},${y} ${x},${y + 6} ${x - 6},${y}"/>`;
			}
			return `<circle class="tube-port tube-port--open" cx="${x}" cy="${y}" r="5"/>`;
		})
		.join("");
}

function cellSvg(kind, rotation, { flowing = false, connectedDirs = [], colorBlind = false } = {}) {
	if (kind === "empty") {
		return `<svg class="tube-cell-svg" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="3" fill="#999" opacity="0.35"/></svg>`;
	}
	const deg = rotation * 90;
	const stroke = colorBlind ? "#111" : STROKE;
	const width = colorBlind ? 12 : 10;
	const core = pipeCore(kind, stroke, width);
	const flowInner =
		flowing && kind !== "empty"
			? pipeCore(kind, colorBlind ? "#fff" : FLOW, colorBlind ? 5 : 4).replaceAll(
					"tube-pipe-core",
					"tube-flow-core",
				)
			: "";
	const extras = sourceGoalMarks(kind, colorBlind);
	const letter = cellLetter(kind, colorBlind, rotation);
	const ports = portMarkers(kind, rotation, connectedDirs);
	return `<svg class="tube-cell-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(${deg} 50 50)">${core}${flowInner}${extras}${letter}</g>${ports}</svg>`;
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
	const colorBlind = isColorBlindMode();
	let html = `<div class="tube-puzzle" role="application" aria-label="Tube puzzle board">
  	<p class="tube-puzzle-caption"><strong>Tube puzzle</strong> — ${level.name}</p>
    <p class="tube-puzzle-mode">${metaLabel}</p>
  	<div class="tube-puzzle-grid" role="group" aria-label="Pipe tiles" aria-describedby="tube-puzzle-hint" style="--tube-rows:${rows};--tube-cols:${cols};">`;

	for (let r = 0; r < rows; r++) {
    	for (let c = 0; c < cols; c++) {
        	const cell = cells[r][c];
        	const label = `${cell.kind}, rotation ${cell.rotation}`;
        	const svg = cellSvg(cell.kind, cell.rotation, { colorBlind });
        	if (cell.kind === "empty") {
            	html += `<div class="tube-cell tube-cell--empty" data-r="${r}" data-c="${c}" aria-hidden="true">${svg}</div>`;
        	} else {
            	html += `<button type="button" class="tube-cell tube-cell--${cell.kind}" data-r="${r}" data-c="${c}" title="${label}" aria-label="${label}">${svg}</button>`;
        	}
    	}
	}

	html += `</div><div class="tube-puzzle-flow-strip" aria-hidden="true"></div>
	<ul class="tube-puzzle-legend" aria-label="Pipe connection key">
		<li><span class="tube-legend-mark tube-legend-mark--linked" aria-hidden="true"></span> Joined ports</li>
		<li><span class="tube-legend-mark tube-legend-mark--open" aria-hidden="true"></span> Open, not joined</li>
		<li><span class="tube-legend-mark tube-legend-mark--flow" aria-hidden="true"></span> Path from source</li>
	</ul>
  	<div class="tube-puzzle-dpad" role="toolbar" aria-label="Move between pipes">
    	<span class="tube-puzzle-dpad-label">Move:</span>
    	<div class="tube-puzzle-dpad-buttons">
      	<button type="button" class="tube-dpad-btn" data-dr="-1" data-dc="0" aria-label="Move selection up">↑</button>
      	<button type="button" class="tube-dpad-btn" data-dr="1" data-dc="0" aria-label="Move selection down">↓</button>
      	<button type="button" class="tube-dpad-btn" data-dr="0" data-dc="-1" aria-label="Move selection left">←</button>
      	<button type="button" class="tube-dpad-btn" data-dr="0" data-dc="1" aria-label="Move selection right">→</button>
    	</div>
  	</div>
	   <div class="tube-puzzle-dpad" role="toolbar" aria-label="Tube puzzle actions">
       <span class="tube-puzzle-dpad-label">Actions:</span>
       <div class="tube-puzzle-dpad-buttons">
           <button type="button" class="tube-dpad-btn" id="tube-reset-btn">Reset</button>
           <button type="button" class="tube-dpad-btn" id="tube-shuffle-btn">Shuffle</button>
       </div>
   </div>
  	<p id="tube-puzzle-hint" class="tube-puzzle-hint">Click a pipe to rotate it. Use the buttons above or your <strong>keyboard’s arrow keys</strong> (↑↓←→) to move between pipes—empty tiles are skipped. Connect source to goal to win. Filled diamonds show joined pipes; hollow circles show open ends that do not meet a neighbor.</p></div>`;
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

function updateFlowPreview(level, gridEl, layoutEl) {
	const connected = getCellsConnectedToSource(level);
	const goalConnected = isSourceConnectedToGoal(level);
	const colorBlind = isColorBlindMode();

	gridEl.querySelectorAll(".tube-cell").forEach((cellEl) => {
    	const r = Number(cellEl.dataset.r);
    	const c = Number(cellEl.dataset.c);
    	const k = `${r},${c}`;
    	const cell = level.cells[r]?.[c];
    	if (!cell) {
    		return;
    	}
    	const isPipe = cell.kind !== "empty";
    	const flowing = isPipe && connected.has(k);
    	const ports = getConnectedDirections(level, r, c);
    	cellEl.classList.toggle("tube-cell--flowing", flowing);
    	if (!isPipe) {
    		return;
    	}
    	const openCount = getOpenDirections(cell.kind, cell.rotation).length;
    	const label = `${cell.kind}, rotation ${cell.rotation}, ${ports.length} of ${openCount} ports connected${flowing ? ", on source path" : ""}`;
    	cellEl.innerHTML = cellSvg(cell.kind, cell.rotation, {
    		flowing,
    		connectedDirs: ports,
    		colorBlind,
    	});
    	cellEl.setAttribute("aria-label", label);
    	cellEl.title = label;
	});

	layoutEl?.classList.toggle("tube-puzzle-layout--flowing", connected.size > 1);
	layoutEl?.classList.toggle("tube-puzzle-layout--goal-connected", goalConnected);
	layoutEl?.classList.toggle("tube-puzzle-layout--color-blind", colorBlind);
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
	// Important: only bind movement arrows, not Reset/Shuffle
	container.querySelectorAll(".tube-dpad-btn[data-dr][data-dc]").forEach((b) => {
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

function wireRotation(gridEl, level, state, tracker, layoutEl) {
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
    	updateFlowPreview(level, gridEl, layoutEl);
    	btn.focus({ preventScroll: true });
    	tryWin(level, gridEl, state);
	});
}

function redrawGridFromLevel(gridEl, level, layoutEl) {
	updateFlowPreview(level, gridEl, layoutEl);
}

function wireActions(layoutEl, gridEl, level, templateLevel, state, tracker) {
	const resetBtn = layoutEl.querySelector("#tube-reset-btn");
	const shuffleBtn = layoutEl.querySelector("#tube-shuffle-btn");

	resetBtn?.addEventListener("click", () => {
    	level.cells = templateLevel.cells.map((row) => row.map((cell) => ({ ...cell })));
    	state.won = false;
    	setGridSolved(gridEl, false);
    	redrawGridFromLevel(gridEl, level, layoutEl);
    	const firstPipe = gridEl.querySelector("button.tube-cell:not([disabled])");
    	if (firstPipe) setSelectedPipe(gridEl, tracker, firstPipe);
	});

	shuffleBtn?.addEventListener("click", () => {
    	for (let r = 0; r < level.rows; r++) {
        	for (let c = 0; c < level.cols; c++) {
            	const cell = level.cells[r][c];
            	if (cell.kind === "empty" || cell.kind === "source" || cell.kind === "goal") continue;
            	cell.rotation = Math.floor(Math.random() * 4);
        	}
    	}
    	state.won = false;
    	setGridSolved(gridEl, false);
    	redrawGridFromLevel(gridEl, level, layoutEl);
    	const firstPipe = gridEl.querySelector("button.tube-cell:not([disabled])");
    	if (firstPipe) setSelectedPipe(gridEl, tracker, firstPipe);
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
        wireRotation(grid, level, winState, tracker, layout);
    	wireActions(layout, grid, level, template, winState, tracker);
        updateFlowPreview(level, grid, layout);
        tryWin(level, grid, winState);
	}
}
