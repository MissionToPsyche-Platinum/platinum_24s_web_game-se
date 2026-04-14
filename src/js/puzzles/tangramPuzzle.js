import { solvePuzzle } from "../gameController.js";

export function startTangramPuzzle({ containerID }) {
    containerID.innerHTML = `
        <div class="tangram-container">
            <h3>Tangram Puzzle</h3>
            <h4>Hint: Green Up Top!</h4>
            <svg id="tangram-svg" width="900" height="400""></svg>
        </div>
    `;

    const svg = document.getElementById("tangram-svg");

    const pieces = [
        { id: "piece1", points: "50,0 250,0 150,200", color: "#ff0000", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 550, solvedY: 200 },
        { id: "piece2", points: "250,200 450,200 350,0", color: "#00ff2f", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 350, solvedY: 0 },
        { id: "piece3", points: "0,400 100,200 200,400", color: "#ff7300", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 500, solvedY: 0 },
        { id: "piece4", points: "200,400 300,200 400,400", color: "#ffff00", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 500, solvedY: 0 },
    ];

    renderTangram(svg, pieces);
    enableDragAndDrop(svg, pieces);
}

function calculateCetner(points) {
    const coords = points.split(" ").map(p => {
        const [x, y] = p.split(",").map(Number);
        return { x, y };
    });

    let sumX = 0, sumY = 0;
    coords.forEach(coord => {
        sumX += coord.x;
        sumY += coord.y;
    });

    return { cx: sumX / coords.length, cy: sumY / coords.length };
}

function checkPosition(piece) {
    const tolerance = 20;

    const dx = Math.abs(piece.x - piece.solvedX);
    const dy = Math.abs(piece.y - piece.solvedY);

    if(dx < tolerance && dy < tolerance){
        piece.inPlace = true;
        const target = document.getElementById(piece.id);
        const { cx, cy } = calculateCetner(piece.points);
        target.setAttribute("transform", `translate(${piece.solvedX}, ${piece.solvedY}) rotate(${piece.rotation}, ${cx}, ${cy})`);
        target.style.cursor = "default";
    }
}

function checkWin(pieces) {
    if(pieces.every(p => p.inPlace)) {
        solvePuzzle();
    }
}



function renderTangram(svg, pieces) {

    svg.innerHTML = `
        <polygon id="outline" points="700,0 500,400 900,400" fill="#120899" stroke="#000000" stroke-width="2"/>
    `;

    pieces.forEach(piece => {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        const { cx, cy } = calculateCetner(piece.points);
        polygon.setAttribute("id", piece.id);
        polygon.setAttribute("points", piece.points);
        polygon.setAttribute("fill", piece.color);
        polygon.setAttribute("transform", `translate(${piece.x} ${piece.y}) rotate(${piece.rotation} ${cx} ${cy})`);
        polygon.style.cursor = "grab";
        svg.appendChild(polygon);
    });
}

function enableDragAndDrop(svg, pieces) {
    let selectedPiece = null;
    let offsetX, offsetY;
    svg.addEventListener("mousedown", (e) => {
        const target = e.target;
        if (target.tagName !== "polygon" && target.id === "outline") {
            return;
        }

        const piece = pieces.find(p => p.id === target.id);
        if (piece.inPlace) {
            return;
        }

        selectedPiece = piece;
        offsetX = e.clientX - piece.x;
        offsetY = e.clientY - piece.y;
        target.style.cursor = "grabbing";
    });

    //svg.addEventListener("mouse")

    svg.addEventListener("mousemove", (e) => {
        if (!selectedPiece) return;

        selectedPiece.x = e.clientX - offsetX;
        selectedPiece.y = e.clientY - offsetY;
        const target = document.getElementById(selectedPiece.id);
        const { cx, cy } = calculateCetner(selectedPiece.points);
        target.setAttribute("transform", `translate(${selectedPiece.x}, ${selectedPiece.y}) rotate(${selectedPiece.rotation}, ${cx}, ${cy})`);
    });

    svg.addEventListener("mouseup", (e) => {
        if (!selectedPiece) return;
        const target = document.getElementById(selectedPiece.id);
        checkPosition(selectedPiece);
        checkWin(pieces);
        target.style.cursor = "grab";
        selectedPiece = null;
    });

    svg.addEventListener("dblclick", (e) => {
        const target = e.target;
        if (target.tagName !== "polygon" && target.id === "outline") {
            return;
        }
        const piece = pieces.find(p => p.id === target.id);
        if (piece.inPlace || !piece) {
            return;
        }
        const { cx, cy } = calculateCetner(piece.points);
        piece.rotation = (piece.rotation + 90) % 360;
        target.setAttribute("transform", `translate(${piece.x}, ${piece.y}) rotate(${piece.rotation}, ${cx}, ${cy})`);
    });
}

const puzzleHeader = document.getElementById("puzzle-header");
