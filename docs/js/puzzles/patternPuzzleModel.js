export const PATTERN_TILE_COUNT = 4;

export const DIFFICULTY_CONFIG = {
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

export function getDifficultyConfig(difficulty) {
    return difficulty === "challenge" ? DIFFICULTY_CONFIG.challenge : DIFFICULTY_CONFIG.normal;
}

export function createPattern(length, tileCount = PATTERN_TILE_COUNT, random = Math.random) {
    const n = Math.max(0, Math.floor(Number(length)) || 0);
    const count = Math.max(1, tileCount);
    return Array.from({ length: n }, () => Math.floor(random() * count));
}

export function isCorrectStep(userInput, pattern) {
    if (!Array.isArray(userInput) || !Array.isArray(pattern) || userInput.length === 0) {
        return false;
    }
    const step = userInput.length - 1;
    if (step >= pattern.length) {
        return false;
    }
    return userInput[step] === pattern[step];
}

export function isRoundComplete(userInput, pattern) {
    return (
        Array.isArray(userInput) &&
        Array.isArray(pattern) &&
        pattern.length > 0 &&
        userInput.length === pattern.length &&
        userInput.every((value, index) => value === pattern[index])
    );
}

export function nextPatternLength(currentLength, maxLength) {
    return Math.min(currentLength + 1, maxLength);
}

export function clampIndex(i, length) {
    if (!Number.isFinite(length) || length <= 0) return 0;
    if (i < 0) return 0;
    if (i >= length) return length - 1;
    return i;
}

export function nextTileIndex(focusedIndex, key, tileCount = PATTERN_TILE_COUNT) {
    const i = clampIndex(focusedIndex, tileCount);
    if (key === "ArrowLeft") return clampIndex(i % 2 === 1 ? i - 1 : i, tileCount);
    if (key === "ArrowRight") return clampIndex(i % 2 === 0 ? i + 1 : i, tileCount);
    if (key === "ArrowUp") return clampIndex(i >= 2 ? i - 2 : i, tileCount);
    if (key === "ArrowDown") return clampIndex(i <= 1 ? i + 2 : i, tileCount);
    return i;
}
