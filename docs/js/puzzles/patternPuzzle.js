import { solvePuzzle } from "../gameController.js";

const COLORS = ["red", "blue", "green", "yellow"];
const COLOR_TONES_HZ = [329.63, 392.0, 261.63, 440.0]; // E4, G4, C4, A4

const TILE_DEFS = [
   { color: "red", shape: "circle", number: 1 },
   { color: "blue", shape: "square", number: 2 },
   { color: "green", shape: "triangle", number: 3 },
   { color: "yellow", shape: "star", number: 4 },
];

function tileShapeMarkup({ shape, number }) {
   const shapes = {
       circle: '<circle class="pattern-tile-icon-shape" cx="50" cy="50" r="34" />',
       square: '<rect class="pattern-tile-icon-shape" x="18" y="18" width="64" height="64" rx="4" />',
       triangle: '<polygon class="pattern-tile-icon-shape" points="50,14 86,86 14,86" />',
       star: '<polygon class="pattern-tile-icon-shape" points="50,8 61,36 92,36 67,54 76,86 50,68 24,86 33,54 8,36 39,36" />',
   };

   return `<span class="pattern-tile-icon" aria-hidden="true">
       <svg viewBox="0 0 100 100" focusable="false">
           ${shapes[shape] ?? ""}
           <text class="pattern-tile-icon-number" x="50" y="54" text-anchor="middle" dominant-baseline="middle">${number}</text>
       </svg>
   </span>`;
}

const DIFFICULTY_CONFIG = {
   normal: {
       startLength: 3,
       maxLength: 6,
       flashMs: 500,
       gapMs: 250,
   },
   challenge: {
       startLength: 4,
       maxLength: 8,
       flashMs: 350,
       gapMs: 170,
   },
};

function getDifficultyConfig() {
   const settings = window.getPyscheSettings?.();
   const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";
   return DIFFICULTY_CONFIG[difficulty];
}

export function startPatternPuzzle({ containerID }) {
   const config = getDifficultyConfig();
   const difficultyLabel = config === DIFFICULTY_CONFIG.challenge ? "Challenge" : "Normal";

   containerID.innerHTML = `
       <div id="pattern-puzzle-layout">
           <header>
               <h3 id="puzzle-header">Pattern Puzzle</h3>
               <p id="pattern-status" role="status" aria-live="polite" aria-atomic="true">Watch the color pattern, then repeat it.</p>               <p id="pattern-mode">Mode: ${difficultyLabel}. Change this in Settings -> Difficulty for timed runs.</p>
           </header>
           <p id="pattern-a11y-hint" class="pattern-hint">
               Each tile has a shape and number: circle (1), square (2), triangle (3), star (4).
               Keyboard: use <strong>1–4</strong> to press tiles, or <strong>arrow keys</strong> to move, then <strong>Enter/Space</strong> to press. Press <strong>R</strong> to replay.
           </p>
           <div id="pattern-pad" role="group" aria-label="Pattern tiles" aria-describedby="pattern-a11y-hint">
               ${TILE_DEFS.map((tile, index) => `
                   <button
                       type="button"
                       class="pattern-tile pattern-tile--${tile.color}"
                       data-index="${index}"
                       aria-label="${tile.color} tile, ${tile.shape}, number ${tile.number}"
                       aria-keyshortcuts="${tile.number}"
                   >${tileShapeMarkup(tile)}</button>
               `).join("")}
           </div>
           <button id="pattern-replay" type="button">Replay Pattern</button>
       </div>
   `;

   const statusEl = containerID.querySelector("#pattern-status");
   const replayButton = containerID.querySelector("#pattern-replay");
   const tiles = containerID.querySelectorAll(".pattern-tile");

   let currentLength = config.startLength;
   let pattern = createPattern(currentLength);
   let userInput = [];
   let acceptingInput = false;
   let focusedIndex = 0;

    // Audio (simple WebAudio tones; gated by Settings -> Sound effects)
   let audioCtx = null;
   function soundEnabled() {
       return window.getPyscheSettings?.()?.soundEnabled ?? true;
   }

   function ensureAudio() {
       if (audioCtx || !soundEnabled()) return audioCtx;
       const Ctx = window.AudioContext || window.webkitAudioContext;
       if (!Ctx) return null;
       audioCtx = new Ctx();
       return audioCtx;
   }

   function playToneForIndex(index, { type = "press" } = {}) {
       if (!soundEnabled()) return;
       const ctx = ensureAudio();
       if (!ctx) return;

       // Some browsers require a user gesture to start audio.
       if (ctx.state === "suspended") ctx.resume().catch(() => {});

       const now = ctx.currentTime;
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();

       const base = COLOR_TONES_HZ[index] ?? 440.0;
       const freq = type === "wrong" ? 140.0 : type === "correct" ? base * 1.25 : base;
       const dur = type === "wrong" ? 0.12 : 0.08;

       osc.type = type === "wrong" ? "sawtooth" : "sine";
       osc.frequency.setValueAtTime(freq, now);

       gain.gain.setValueAtTime(0.0001, now);
       gain.gain.exponentialRampToValueAtTime(type === "wrong" ? 0.18 : 0.12, now + 0.01);
       gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

       osc.connect(gain);
       gain.connect(ctx.destination);
       osc.start(now);
       osc.stop(now + dur + 0.02);
   }


   function clearFeedbackClasses(tile) {
       tile.classList.remove(
           "pattern-tile--pressed",
           "pattern-tile--correct",
           "pattern-tile--wrong",
           "pattern-tile--playback",
       );
   }

   function showTileFeedback(tile, kind) {
       if (!tile) return;
       clearFeedbackClasses(tile);
       tile.classList.add("pattern-tile--pressed");
       if (kind === "correct") tile.classList.add("pattern-tile--correct");
       if (kind === "wrong") tile.classList.add("pattern-tile--wrong");
       setTimeout(() => clearFeedbackClasses(tile), 220);
   }
    function setTilesDisabled(disabled) {
       tiles.forEach((t) => {
           t.disabled = disabled;
           if (disabled) t.classList.add("pattern-tile--disabled");
           else t.classList.remove("pattern-tile--disabled");
       });
   }


   function clampIndex(i) {
       if (i < 0) return 0;
       if (i >= tiles.length) return tiles.length - 1;
       return i;
   }


   function focusTile(i) {
       focusedIndex = clampIndex(i);
       const t = tiles[focusedIndex];
       if (t && !t.disabled) t.focus({ preventScroll: true });
   }

   async function showPattern() {
       acceptingInput = false;
       setTilesDisabled(true);
       userInput = [];
       setStatus(`Memorize ${currentLength} colors.`);
       for (const index of pattern) {
           await flashTile(index);
       }
       setStatus("Your turn: click colors in order.");
       acceptingInput = true;
       setTilesDisabled(false);
       focusTile(focusedIndex);
   }

   function setStatus(message) {
       if (statusEl) statusEl.textContent = message;
   }

   function createPattern(length) {
       return Array.from({ length }, () => Math.floor(Math.random() * COLORS.length));
   }

   function flashTile(index) {
       return new Promise((resolve) => {
           const tile = tiles[index];
           if (!tile) {
               resolve();
               return;
           }

           tile.classList.add("pattern-tile--playback");
           setTimeout(() => {
               tile.classList.remove("pattern-tile--playback");
               setTimeout(resolve, config.gapMs);
           }, config.flashMs);
       });
   }

   async function onTileClick(event) {
       if (!acceptingInput) return;

       const index = Number(event.currentTarget?.dataset.index);
       if (Number.isNaN(index)) return;

       const tile = tiles[index];
       playToneForIndex(index, { type: "press" });
       showTileFeedback(tile, "press");

       await flashTile(index);
       userInput.push(index);

       const step = userInput.length - 1;
       if (userInput[step] !== pattern[step]) {
           playToneForIndex(index, { type: "wrong" });
           showTileFeedback(tile, "wrong");
           setStatus("Incorrect pattern. Try this round again.");
           acceptingInput = false;
           setTilesDisabled(true);
           setTimeout(showPattern, 600);
           return;
       }
        showTileFeedback(tile, "correct");

       if (userInput.length === pattern.length) {
           if (currentLength >= config.maxLength) {
               playToneForIndex(index, { type: "correct" });
               setStatus("Great memory! Pattern solved.");
               acceptingInput = false;
               solvePuzzle();
               return;
           }

           currentLength += 1;
           pattern = createPattern(currentLength);
           playToneForIndex(index, { type: "correct" });
           setStatus("Correct! Next pattern is longer.");
           setTilesDisabled(true);
           setTimeout(showPattern, 700);
       }
   }

 function onKeyDown(e) {
       // Ignore if user is typing in an input somewhere (future-proof).
       const tag = e.target?.tagName;
       if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;

       // Global shortcuts for this puzzle region.
       if (e.key === "r" || e.key === "R") {
           e.preventDefault();
           showPattern();
           return;
       }

       const numberIndex = ["1", "2", "3", "4"].indexOf(e.key);
       if (numberIndex !== -1) {
           e.preventDefault();
           if (!tiles[numberIndex]?.disabled) tiles[numberIndex].click();
           return;
       }

       const move = (di) => {
           e.preventDefault();
           focusTile(focusedIndex + di);
       };

       // 2x2 grid: indices 0 1 / 2 3
       if (e.key === "ArrowLeft") return move(focusedIndex % 2 === 1 ? -1 : 0);
       if (e.key === "ArrowRight") return move(focusedIndex % 2 === 0 ? 1 : 0);
       if (e.key === "ArrowUp") return move(focusedIndex >= 2 ? -2 : 0);
       if (e.key === "ArrowDown") return move(focusedIndex <= 1 ? 2 : 0);

       if (e.key === "Enter" || e.key === " ") {
           // Space key is " " in key values.
           e.preventDefault();
           const t = tiles[focusedIndex];
           if (t && !t.disabled) t.click();
       }
   }

   function updateFocusedIndexFromEvent(e) {
       const idx = Number(e.currentTarget?.dataset.index);
       if (!Number.isNaN(idx)) focusedIndex = idx;
   }

   tiles.forEach((tile) => {
       tile.addEventListener("click", onTileClick);
       tile.addEventListener("focus", updateFocusedIndexFromEvent);
   });

   replayButton?.addEventListener("click", showPattern);
   containerID.addEventListener("keydown", onKeyDown);
   showPattern();
}
