import { solvePuzzle } from "../gameController.js";

const COLORS = ["red", "blue", "green", "yellow"];
const COLOR_TONES_HZ = [329.63, 392.0, 261.63, 440.0]; // E4, G4, C4, A4

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
               Keyboard: use <strong>1–4</strong> to press tiles, or <strong>arrow keys</strong> to move, then <strong>Enter/Space</strong> to press. Press <strong>R</strong> to replay.
           </p>
           <div id="pattern-pad" role="group" aria-label="Pattern tiles" aria-describedby="pattern-a11y-hint" style="display:grid;grid-template-columns:repeat(2,80px);gap:10px;justify-content:center;margin:15px 0;">
               ${COLORS.map((color, index) => `
                   <button
                       type="button"
                       class="pattern-tile"
                       data-index="${index}"
                       style="height:80px;border:2px solid #222;border-radius:8px;background:${color};opacity:0.65;cursor:pointer;"
                       aria-label="${color} tile"
                       aria-keyshortcuts="${index + 1}"
                   ></button>
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
       tile.classList.remove("pattern-tile--pressed", "pattern-tile--correct", "pattern-tile--wrong");
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

           tile.style.opacity = "1";
           setTimeout(() => {
               tile.style.opacity = "0.65";
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
