export function isSlidingPuzzleSolved(state) {
    return Array.isArray(state)
        && state.length > 0
        && state.every((tile, index) => tile?.finalPos === index);
}

export function isTangramSolved(pieces) {
    return Array.isArray(pieces)
        && pieces.length > 0
        && pieces.every((piece) => piece.inPlace === true);
}

export function isNumberLogicSolved(current, solution) {
    if (!Array.isArray(current) || !Array.isArray(solution) || current.length === 0) {
        return false;
    }
    if (current.length !== solution.length) return false;

    for (let i = 0; i < solution.length; i++) {
        if (!Array.isArray(current[i]) || current[i].length !== solution[i].length) {
            return false;
        }
        for (let j = 0; j < solution[i].length; j++) {
            if (current[i][j] !== solution[i][j]) return false;
        }
    }
    return true;
}

export function isMatchingPuzzleSolved(pairsFound, tileCount) {
    if (!Number.isFinite(pairsFound) || !Number.isFinite(tileCount) || tileCount < 2) {
        return false;
    }
    return pairsFound === Math.floor(tileCount / 2);
}

export function isMazeSolved(playerIndex, endTile) {
    return playerIndex === endTile;
}

export function isPatternPuzzleSolved(userInput, pattern, maxLength) {
    if (!Array.isArray(userInput) || !Array.isArray(pattern) || pattern.length === 0) {
        return false;
    }
    if (userInput.length !== pattern.length || pattern.length < maxLength) {
        return false;
    }
    return userInput.every((value, index) => value === pattern[index]);
}
