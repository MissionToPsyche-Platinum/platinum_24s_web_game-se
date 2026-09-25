import { solvePuzzle } from "../gameController.js";

export function startTangramPuzzle({ containerID }) {
    const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
    const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";

    containerID.innerHTML = `
        <div class="tangram-container">
            <h3>Tangram Puzzle</h3>
            
            <svg id="tangram-svg" width="950" height="650""></svg>
        </div>
    `;

    const svg = document.getElementById("tangram-svg");

    const puzzleCombos = [

        {
            name: "triangle",
            outline: "700,0 500,400 900,400",
            pieces: [
            { id: "piece1", type: "triangle", points: "50,0 250,0 150,200", color: "#ff0000", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 550, solvedY: 200 },
            { id: "piece2", type: "triangle", points: "250,200 450,200 350,0", color: "#00ff2f", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 350, solvedY: 0 },
            { id: "piece3", type: "triangle", points: "0,400 100,200 200,400", color: "#ff7300", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 500, solvedY: 0 },
            { id: "piece4", type: "triangle", points: "200,400 300,200 400,400", color: "#ffff00", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 500, solvedY: 0 }
            ],
            solution: [
                { 
                    id: "spot1", 
                    type: "triangle", 
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 550, y: 200, rotation: 0 },
                        piece2: { x: 350, y: 133.33, rotation: 180 },
                        piece3: { x: 600, y: -66.67, rotation: 180 },
                        piece4: { x: 400, y: -66.67, rotation: 180 }
                    }   
                },
                { 
                    id: "spot2", 
                    type: "triangle", 
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 550, y: 66.67, rotation: 180 },
                        piece2: { x: 350, y: 0, rotation: 0 },
                        piece3: { x: 600, y: -200, rotation: 0 },
                        piece4: { x: 400, y: -200, rotation: 0 }
                    }   
                },
                { 
                    id: "spot3", 
                    type: "triangle", 
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 450, y: 266.67, rotation: 180 },
                        piece2: { x: 250, y: 200, rotation: 0 },
                        piece3: { x: 500, y: 0, rotation: 0 },
                        piece4: { x: 300, y: 0, rotation: 0 }
                    }   
                },
                { 
                    id: "spot4", 
                    type: "triangle", 
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 650, y: 266.67, rotation: 180 },
                        piece2: { x: 450, y: 200, rotation: 0 },
                        piece3: { x: 700, y: 0, rotation: 0 },
                        piece4: { x: 500, y: 0, rotation: 0 }
                    }   
                },
            ]
        },
        {
            name: "square",
            outline: "500,0 500,400 900,400 900,0",
            pieces: [
            { id: "piece1", type: "triangle", points: "50,0 250,0 150,200", color: "#ff0000", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 450, solvedY: 0 },
            { id: "piece2", type: "triangle", points: "250,200 450,200 350,0", color: "#00ff2f", inPlace: false, x: -20, y: 250, rotation: 0, solvedX: 350, solvedY: 0 },
            { id: "piece3", type: "largeTriangle", points: "0,400 0,0 200,400", color: "#ff7300", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 500, solvedY: 0 },
            { id: "piece4", type: "triangle", points: "200,400 300,200 400,400", color: "#ffff00", inPlace: false, x: 0, y: 250, rotation: 0, solvedX: 500, solvedY: 0 },
            { id: "piece5", type: "triangle", points: "600,450 700,650 800,450", color: "#00ffff", inPlace: false, x: 0, y: 0, rotation: 0, solvedX: 0, solvedY: -250 },
            { id: "piece6", type: "largeTriangle", points: "700,0 900,400 900,0", color: "#ff00ff", inPlace: false, x: -450, y: 0, rotation: 0, solvedX: 0, solvedY: 0 }
            ],
            solution: [
                { 
                    id: "spot1", 
                    type: "triangle",
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 450, y: 0, rotation: 0 },
                        piece2: { x: 250, y: -66.67, rotation: 180 },
                        piece4: { x: 300, y: -266.67, rotation: 180 },
                        piece5: { x: -100, y: -450, rotation: 0 }
                    }
                },
                { 
                    id: "spot2",
                    type: "triangle",
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 550, y: 66.67, rotation: 180 },
                        piece2: { x: 350, y: 0, rotation: 0 },
                        piece4: { x: 400, y: -200, rotation: 0 },
                        piece5: { x: 0, y: -383.33, rotation: 180 }
                    }
                },
                {
                    id: "spot3",
                    type: "triangle",
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 650, y: 266.67, rotation: 180 },
                        piece2: { x: 450, y: 200, rotation: 0 },
                        piece4: { x: 500, y: 0, rotation: 0 },
                        piece5: { x: 100, y: -183.33, rotation: 180 }
                    }
                },
                {
                    id: "spot4",
                    type: "triangle",
                    occupied: false,
                    possiblePlacements: {
                        piece1: { x: 550, y: 200, rotation: 0 },
                        piece2: { x: 350, y: 133.33, rotation: 180 },
                        piece4: { x: 400, y: -66.67, rotation: 180 },
                        piece5: { x: 0, y: -250, rotation: 0 }
                    }
                },
                {
                    id: "spot5",
                    type: "largeTriangle",
                    occupied: false,
                    possiblePlacements: {
                        piece3: { x: 500, y: 0, rotation: 0 },
                        piece6: { x: -266.67, y: 133.33, rotation: 180 }
                    }
                },
                {
                    id: "spot6",
                    type: "largeTriangle",
                    occupied: "false",
                    possiblePlacements: {
                        piece3: { x: 766.67, y: -133.33, rotation: 180 },
                        piece6: { x: 0, y: 0, rotation: 0 }
                    }
                }

            ]
        },

        {
            name: "rectangle",
            outline: "250,0 250,400 500,400 500,0",
            pieces: [
            { id: "piece1", points: "250,0 500,0 500,200", color: "#ff0000", inPlace: false, x: -260, y: 225, rotation: 0, solvedX: 0, solvedY: 0 },
            { id: "piece2", points: "250,0 250,400 400,200 400,120", color: "#00ff2f", inPlace: false, x: 350, y: 0, rotation: 0, solvedX: 0, solvedY: 0 },
            { id: "piece3", points: "250,400 400,200 400,400", color: "#ff7300", inPlace: false, x: -250, y: -200, rotation: 0, solvedX: 0, solvedY: 0 },
            { id: "piece4", points: "400,120 400,300 500,300 500,200", color: "#ffff00", inPlace: false, x: -325, y: 300, rotation: 0, solvedX: 0, solvedY: 0 },
            { id: "piece5", type: "square" , points: "400,300 400,400 500,400 500,300", color: "#00ffff", inPlace: false, x: 75, y: 150, rotation: 0, solvedX: 0, solvedY: 0 },
            ]
        }

    ];
    //revert back after testing
    //const randomConfig = puzzleCombos[Math.floor(Math.random() * puzzleCombos.length)];
    const randomConfig = puzzleCombos[1];

    if (difficulty === "challenge") {
        randomConfig.pieces.forEach(piece => {
            piece.rotation = Math.floor(Math.random() * 4) * 90;
        });
    }

    renderTangram(svg, randomConfig);
    enableDragAndDrop(svg, randomConfig.pieces, randomConfig.solution, difficulty);
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

function checkPosition(piece , solution) {
    const tolerance = 20;

    for (const spot of solution){

        if (piece.type !== spot.type) {
            continue;
        }

        if (spot.occupied) {
            continue;
        }   

        const checkedPlacement = spot.possiblePlacements[piece.id];
        if (!checkedPlacement) {
            continue;
        }

        const dx = Math.abs(piece.x - checkedPlacement.x);
        const dy = Math.abs(piece.y - checkedPlacement.y);

        const correctRotation = piece.rotation % 360 === checkedPlacement.rotation;

        if(dx < tolerance && dy < tolerance && correctRotation) {
            piece.inPlace = true;
            spot.occupied = true;

            piece.x = checkedPlacement.x;
            piece.y = checkedPlacement.y;
            piece.rotation = checkedPlacement.rotation;

            const target = document.getElementById(piece.id);
            const { cx, cy } = calculateCetner(piece.points);
            target.setAttribute("transform", `translate(${piece.x}, ${piece.y}) rotate(${piece.rotation}, ${cx}, ${cy})`);
            target.style.cursor = "default";

            return;
        }
    }
}

function checkWin(pieces) {
    if(pieces.every(p => p.inPlace)) {
        solvePuzzle();
    }
}



function renderTangram(svg, puzzle) {

    svg.innerHTML = `
        <polygon id="outline" points="${puzzle.outline}" fill="#120899" stroke="#000000" stroke-width="2"/>
    `;

    puzzle.pieces.forEach(piece => {
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

function enableDragAndDrop(svg, pieces, solution, difficulty) {
    let selectedPiece = null;
    let offsetX, offsetY;
    const getSvgPoint = (event) => {
        const rect = svg.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (svg.viewBox.baseVal.width / rect.width || 1),
            y: (event.clientY - rect.top) * (svg.viewBox.baseVal.height / rect.height || 1)
        };
    };

    svg.addEventListener("mousedown", (e) => {
        const target = e.target;
        if (target.tagName !== "polygon" || target.id === "outline") {
            return;
        }

        const piece = pieces.find(p => p.id === target.id);
        if (!piece || piece.inPlace) {
            return;
        }

        const point = getSvgPoint(e);
        selectedPiece = piece;
        offsetX = point.x - piece.x;
        offsetY = point.y - piece.y;
        target.style.cursor = "grabbing";
    });

    //svg.addEventListener("mouse")

    svg.addEventListener("mousemove", (e) => {
        if (!selectedPiece) return;

        const point = getSvgPoint(e);
        selectedPiece.x = point.x - offsetX;
        selectedPiece.y = point.y - offsetY;
        const target = document.getElementById(selectedPiece.id);
        const { cx, cy } = calculateCetner(selectedPiece.points);
        target.setAttribute("transform", `translate(${selectedPiece.x}, ${selectedPiece.y}) rotate(${selectedPiece.rotation}, ${cx}, ${cy})`);
    });

    svg.addEventListener("mouseup", (e) => {
        if (!selectedPiece) return;
        const target = document.getElementById(selectedPiece.id);
        checkPosition(selectedPiece , solution);
        checkWin(pieces);
        target.style.cursor = "grab";
        selectedPiece = null;
    });



    if(difficulty === "challenge") {
        svg.addEventListener("dblclick", (e) => {
            const target = e.target;
            if (target.tagName !== "polygon" || target.id === "outline") {
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
}

const puzzleHeader = document.getElementById("puzzle-header");
