import { solvePuzzle } from "../gameController.js";

const COLORS = ["red", "blue", "green", "yellow"];
const MAX_PATTERN_LENGTH = 6;
const START_PATTERN_LENGTH = 3;
const FLASH_MS = 500;
const GAP_MS = 250;

export function startPatternPuzzle({ containerID }) {
   containerID.innerHTML = `
       <div id="pattern-puzzle-layout">
           <header>
               <h3 id="puzzle-header">Pattern Puzzle</h3>
               <p id="pattern-status">Watch the color pattern, then repeat it.</p>
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

   let currentLength = START_PATTERN_LENGTH;
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
               setTimeout(resolve, GAP_MS);
           }, FLASH_MS);
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
           if (currentLength >= MAX_PATTERN_LENGTH) {
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
