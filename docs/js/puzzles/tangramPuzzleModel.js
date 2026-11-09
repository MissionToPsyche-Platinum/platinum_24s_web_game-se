

export function calculateCetner(points) {
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

export function checkPosition(piece , solution) {
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