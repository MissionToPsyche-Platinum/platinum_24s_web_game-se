import { missionFacts } from "./factList.js";

let remainingFacts = [];
let lastShownFact = "";

function shuffleFacts(facts) {
    const shuffled = [...facts];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function buildShuffledQueue() {
    const shuffled = shuffleFacts(missionFacts);
    if (shuffled.length > 1 && shuffled[0] === lastShownFact) {
        const first = shuffled.shift();
        shuffled.push(first);
    }
    return shuffled;
}

export function resetMissionFactQueue() {
    lastShownFact = "";
    remainingFacts = buildShuffledQueue();
}

export function nextMissionFact() {
    if (!missionFacts.length) {
        return "";
    }
    if (!remainingFacts.length) {
        remainingFacts = buildShuffledQueue();
    }
    const fact = remainingFacts.shift() ?? "";
    lastShownFact = fact;
    return fact;
}
