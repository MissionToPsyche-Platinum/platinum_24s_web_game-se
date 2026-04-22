import { solvePuzzle } from "../gameController.js";

const COLORS = ["red", "blue", "green", "yellow"];
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
               <p id="pattern-status">Watch the color pattern, then repeat it.</p>
               <p id="pattern-mode">Mode: ${difficultyLabel}. Change this in Settings -> Difficulty for timed runs.</p>
           </header>
           <div id="pattern-pad" style="display:grid;grid-template-columns:repeat(2,80px);gap:10px;justify-content:center;margin:15px 0;">
               ${COLORS.map((color, index) => `
                   <button
                       type="button"
                       class="pattern-tile"
                       data-index="${index}"
                       style="height:80px;border:2px solid #222;border-radius:8px;background:${color};opacity:0.65;cursor:pointer;"
                       aria-label="${color} tile"
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

   async function showPattern() {
       acceptingInput = false;
       userInput = [];
       setStatus(`Memorize ${currentLength} colors.`);
       for (const index of pattern) {
           await flashTile(index);
       }
       setStatus("Your turn: click colors in order.");
       acceptingInput = true;
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

       await flashTile(index);
       userInput.push(index);

       const step = userInput.length - 1;
       if (userInput[step] !== pattern[step]) {
           setStatus("Incorrect pattern. Try this round again.");
           acceptingInput = false;
           setTimeout(showPattern, 600);
           return;
       }

       if (userInput.length === pattern.length) {
           if (currentLength >= config.maxLength) {
               setStatus("Great memory! Pattern solved.");
               acceptingInput = false;
               solvePuzzle();
               return;
           }

           currentLength += 1;
           pattern = createPattern(currentLength);
           setStatus("Correct! Next pattern is longer.");
           setTimeout(showPattern, 700);
       }
   }

   tiles.forEach((tile) => tile.addEventListener("click", onTileClick));
   replayButton?.addEventListener("click", showPattern);
   showPattern();
}
