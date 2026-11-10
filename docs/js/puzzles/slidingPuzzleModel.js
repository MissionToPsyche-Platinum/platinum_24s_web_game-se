

export function buildPuzzle(gridSize) {
    const tileQuantity = gridSize * gridSize;

    const state = [];

    for (let i = 0; i < tileQuantity - 1; i++) {
        state.push({
            value: i,
            finalPos: i
        });
    }

    state.push({
        value: null,
        finalPos : tileQuantity - 1
    });

    return state;
}

export function shufflePieces (state, gridSize) {
    let lastIndex = null;

    for(let i = 0; i < 50; i++) {
        const emptyIndex = getEmptyTile(state);

        let movableTiles = state
            .map((tile, index) => index)
            .filter(index => checkSwap(index, emptyIndex, gridSize));

        let possibleMoves = movableTiles.filter(
            index => index !== lastIndex
        );

        if (possibleMoves.length === 0) {
            possibleMoves = movableTiles;
        }

        const randomIndex =
            possibleMoves[
                Math.floor(Math.random() * possibleMoves.length)
            ];

        swapTiles(state, randomIndex, emptyIndex);
        lastIndex = emptyIndex;
    }

    return state;
}

export function checkSwap (index , emptyIndex, gridSize) {
    const posValue = index - emptyIndex;
    if(posValue === gridSize || posValue == -gridSize) return true;

    if(posValue === -1 || posValue === 1){
        return Math.floor(index / gridSize) === Math.floor(emptyIndex / gridSize);
    } 

    return false;
}

export function getEmptyTile(state){
    return state.findIndex(tile => tile.value === null);
}



export function swapTiles (state , index , emptyIndex) {
    [state[index] , state[emptyIndex]] = [state[emptyIndex] , state[index]];
}