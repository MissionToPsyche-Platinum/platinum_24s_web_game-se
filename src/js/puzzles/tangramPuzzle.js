export function startTangramPuzzle({ containerID }) {
    containerID.innerHTML = `
        <div class="tangram-container">
            <svg id="tangram-svg" width="800" height="400""></svg>
        </div>
    `;

    const svg = document.getElementById("tangram-svg");

    const pieces = [
        { id: "piece1", points: "600,0 800,0 700,100", color: "#ff0000", inPlace: false },
        { id: "piece2", points: "400,0 600,0 500,200", color: "#00ff2f", inPlace: false },
    ];

    renderTangram(svg, pieces);
}

function renderTangram(svg, pieces) {

    svg.innerHTML = `
        <polygon id="outline" points="0,0 400,0 400,400 0,400" fill="#120899" stroke="#000000" stroke-width="2"/>
    `;

    pieces.forEach(piece => {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("id", piece.id);
        polygon.setAttribute("points", piece.points);
        polygon.setAttribute("fill", piece.color);
        svg.appendChild(polygon);
    });
}

const puzzleHeader = document.getElementById("puzzle-header");
