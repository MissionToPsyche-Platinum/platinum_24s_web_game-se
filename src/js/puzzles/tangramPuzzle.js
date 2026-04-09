export function startTangramPuzzle({ containerID }) {
    containerID.innerHTML = `
        <div class="tangram-container">
            <svg id="tangram-svg" width="900" height="400""></svg>
        </div>
    `;

    const svg = document.getElementById("tangram-svg");

    const pieces = [
        { id: "piece1", points: "50,0 250,0 150,200", color: "#ff0000", inPlace: false, x: 0, y: 0, rotation: 0 },
        { id: "piece2", points: "250,0 450,0 350,200", color: "#00ff2f", inPlace: false, x: 0, y: 0, rotation: 0 },
        { id: "piece3", points: "0,400 100,200 200,400", color: "#ff7300", inPlace: false, x: 0, y: 0, rotation: 0 },
        { id: "piece4", points: "200,400 300,200 400,400", color: "#ffff00", inPlace: false, x: 0, y: 0, rotation: 0 },
    ];

    renderTangram(svg, pieces);
    enableDragAndDrop(svg, pieces);
}

function renderTangram(svg, pieces) {

    svg.innerHTML = `
        <polygon id="outline" points="700,0 500,400 900,400" fill="#120899" stroke="#000000" stroke-width="2"/>
    `;

    pieces.forEach(piece => {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("id", piece.id);
        polygon.setAttribute("points", piece.points);
        polygon.setAttribute("fill", piece.color);
        polygon.setAttribute("transform", `translate(${piece.x}, ${piece.y}) rotate(${piece.rotation})`);
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

    svg.addEventListener("mousemove", (e) => {
        if (!selectedPiece) return;

        selectedPiece.x = e.clientX - offsetX;
        selectedPiece.y = e.clientY - offsetY;
        const target = document.getElementById(selectedPiece.id);
        target.setAttribute("transform", `translate(${selectedPiece.x}, ${selectedPiece.y}) rotate(${selectedPiece.rotation})`);
    });

    svg.addEventListener("mouseup", (e) => {
        if (!selectedPiece) return;
        const target = document.getElementById(selectedPiece.id);
        target.style.cursor = "grab";
        selectedPiece = null;
    });
}

const puzzleHeader = document.getElementById("puzzle-header");
