import { solvePuzzle } from '../gameController.js';
export function startMatchingPuzzle({ containerID }) {
    const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
    const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";
    const imageSize = difficulty === 'normal' ? 180 : 140;

    const psyche_image_1 = document.createElement('img');
    const psyche_image_2 = document.createElement('img');
    const psyche_image_3 = document.createElement('img');
    const psyche_image_4 = document.createElement('img');
    const psyche_image_5 = document.createElement('img');
    const psyche_image_6 = document.createElement('img');
    const psyche_image_7 = document.createElement('img');
    const psyche_image_8 = document.createElement('img');
    const psyche_image_9 = document.createElement('img');
    const psyche_image_10 = document.createElement('img');
    const psyche_image_11 = document.createElement('img');
    const psyche_image_12 = document.createElement('img');

    const psyche_image_1_2 = document.createElement('img');
    const psyche_image_2_2 = document.createElement('img');
    const psyche_image_3_2 = document.createElement('img');
    const psyche_image_4_2 = document.createElement('img');
    const psyche_image_5_2 = document.createElement('img');
    const psyche_image_6_2 = document.createElement('img');
    const psyche_image_7_2 = document.createElement('img');
    const psyche_image_8_2 = document.createElement('img');
    const psyche_image_9_2 = document.createElement('img');
    const psyche_image_10_2 = document.createElement('img');
    const psyche_image_11_2 = document.createElement('img');
    const psyche_image_12_2 = document.createElement('img');

    psyche_image_1.src = './images/matching/Psyche_asteroid_illustration.jpg';
    // psyche_image_1.width = imageSize;
    // psyche_image_1.height = imageSize;

    psyche_image_2.src = './images/matching/Psyche_at_sunset.jpg';
    // psyche_image_2.width = imageSize;
    // psyche_image_2.height = imageSize;

    psyche_image_3.src = './images/matching/Psyche_closeup.jpg';
    // psyche_image_3.width = imageSize;
    // psyche_image_3.height = imageSize;

    psyche_image_4.src = './images/matching/Psyche_countdown.jpg';
    // psyche_image_4.width = imageSize;
    // psyche_image_4.height = imageSize;

    psyche_image_5.src = './images/matching/Psyche_Launch_2.jpg';
    // psyche_image_5.width = imageSize;
    // psyche_image_5.height = imageSize;

    psyche_image_6.src = './images/matching/Psyche_ring_of_firepower.jpg';
    // psyche_image_6.width = imageSize;
    // psyche_image_6.height = imageSize;

    psyche_image_7.src = './images/matching/Psyche_spacecraft.jpg';
    // psyche_image_7.width = imageSize;
    // psyche_image_7.height = imageSize;

    psyche_image_8.src = './images/matching/Psyche_at_sunset_2.jpg';

    psyche_image_9.src = './images/matching/Psyche_craft_panel_array.jpg';

    psyche_image_10.src = './images/matching/Psyche_Launch_3.jpg';

    psyche_image_11.src = './images/matching/Psyche_liftoff.jpg';

    psyche_image_12.src = './images/matching/Psyche_media_day.jpg';

    psyche_image_1_2.src = './images/matching/Psyche_asteroid_illustration.jpg';
    // psyche_image_1_2.width = imageSize;
    // psyche_image_1_2.height = imageSize;

    psyche_image_2_2.src = './images/matching/Psyche_at_sunset.jpg';
    // psyche_image_2_2.width = imageSize;
    // psyche_image_2_2.height = imageSize;

    psyche_image_3_2.src = './images/matching/Psyche_closeup.jpg';
    // psyche_image_3_2.width = imageSize;
    // psyche_image_3_2.height = imageSize;

    psyche_image_4_2.src = './images/matching/Psyche_countdown.jpg';
    // psyche_image_4_2.width = imageSize;
    // psyche_image_4_2.height = imageSize;

    psyche_image_5_2.src = './images/matching/Psyche_Launch_2.jpg';
    // psyche_image_5_2.width = imageSize;
    // psyche_image_5_2.height = imageSize;

    psyche_image_6_2.src = './images/matching/Psyche_ring_of_firepower.jpg';
    // psyche_image_6_2.width = imageSize;
    // psyche_image_6_2.height = imageSize;

    psyche_image_7_2.src = './images/matching/Psyche_spacecraft.jpg';
    // psyche_image_7_2.width = imageSize;
    // psyche_image_7_2.height = imageSize;

    psyche_image_8_2.src = './images/matching/Psyche_at_sunset_2.jpg';

    psyche_image_9_2.src = './images/matching/Psyche_craft_panel_array.jpg';

    psyche_image_10_2.src = './images/matching/Psyche_Launch_3.jpg';

    psyche_image_11_2.src = './images/matching/Psyche_liftoff.jpg';

    psyche_image_12_2.src = './images/matching/Psyche_media_day.jpg';

    let clickedElement1;
    let clickedElement1Parent;
    let clickedElement2;
    let clickedElement2Parent;
    let element1Index;
    let element2Index;
    let pairsFound = 0;
    let numberArray = [];

    let imagesArray1 = [psyche_image_1, psyche_image_2, psyche_image_3, psyche_image_4, psyche_image_5, psyche_image_6, psyche_image_7, psyche_image_8, psyche_image_9, psyche_image_10, psyche_image_11, psyche_image_12];
    let imagesArray2 = [psyche_image_1_2, psyche_image_2_2, psyche_image_3_2, psyche_image_4_2, psyche_image_5_2, psyche_image_6_2, psyche_image_7_2, psyche_image_8_2, psyche_image_9_2, psyche_image_10_2, psyche_image_11_2, psyche_image_12_2];

    if (difficulty === "normal") {
        containerID.innerHTML = `
            <div id="puzzle-layout">
                <header>
                    <h2 class="puzzle-title" id="matching-puzzle-header">Matching Puzzle</h2>
                </header>
                <div class="matching-grid-container" id="gridContainer">
                    <div class="clicked-tile" data-id="0">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="0" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="1">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="1" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="2">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="2" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="3">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="3" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="4">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="4" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="5">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="5" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="6">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="6" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="7">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="7" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="8">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="8" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="9">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="9" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="10">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="10" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="11">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="11" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="12">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="12" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="13">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="13" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="14">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="14" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="15">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="15" class="matching-grid-item">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        containerID.innerHTML = `
            <div id="puzzle-layout">
                <header>
                    <h2 class="puzzle-title" id="matching-puzzle-header">Matching Puzzle</h2>
                </header>
                <div class="matching-challenge-grid-container" id="gridContainer">
                    <div class="clicked-tile" data-id="0">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="0" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="1">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="1" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="2">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="2" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="3">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="3" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="4">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="4" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="5">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="5" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="6">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="6" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="7">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="7" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="8">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="8" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="9">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="9" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="10">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="10" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="11">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="11" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" id="free-tile" data-id="12">Free!</div>
                    <div class="clicked-tile" data-id="13">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="13" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="14">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="14" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="15">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="15" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="16">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="16" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="17">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="17" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="18">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="18" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="19">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="19" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="20">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="20" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="21">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="21" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="22">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="22" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="23">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="23" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                    <div class="clicked-tile" data-id="24">
                        <div class="matching-grid-item-tile">
                            <div class="matching-grid-item-front"></div>
                            <div data-id="24" class="matching-challenge-grid-item">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    const tileClass = difficulty === "normal" ? ".clicked-tile" : ".clicked-tile";
    const displayTile = difficulty === "normal" ? ".matching-grid-item" : ".matching-challenge-grid-item";
    const NUM_TILES = difficulty === "normal" ? 16 : 25;
    const tileSize = difficulty === "normal" ? "180px" : "140px";
    const gridItems = document.querySelectorAll(tileClass);
    populateMatchingPuzzle();

    gridItems.forEach(item => {
        item.style.width = tileSize;
        item.style.height = tileSize;
        if (item.textContent !== 'Free!') {
            item._clickWrapper = (event) => {
                const backId = item.getAttribute('data-id');
                const backItem = item.querySelector(displayTile);
                clickTile(item, backId, backItem);
            }

            item.addEventListener('click', item._clickWrapper);
        }
        else {
            item.style.paddingTop = "45px";
            item.style.backgroundColor = '#301934';
        }
    });

    function populateMatchingPuzzle () {
        
        for (let i = 0; i < NUM_TILES; i++) {
            if (difficulty === 'challenge' && i === 12) {
                numberArray[i] = 'Free!';
            }
            else {
                numberArray[i] = i % Math.ceil((NUM_TILES/2));
            }
        }
        numberArray = shuffleArray(numberArray);

        const gridItems = document.querySelectorAll(tileClass);

        gridItems.forEach((item, index) => {
            item.style.color = "rgba(249, 160, 0, 1)";
        });
    }

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            if (i === 12 && difficulty === 'challenge') {

            }
            else {
                const j = Math.floor(Math.random() * (i + 1));
                if (j !== 12) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
        }
        return arr;
    }

    function clickTile(item, itemId, itemBack) {
        if (clickedElement1 == null) {
            clickedElement1 = itemBack;
            clickedElement1Parent = item;
            item.classList.toggle("clicked");
            element1Index = +clickedElement1.dataset.id;
            clickedElement1.appendChild(imagesArray1[numberArray[element1Index]]);
            clickedElement1.style.border = '4px solid #702963'
        }
        else if (clickedElement2 == null) {
            clickedElement2 = itemBack;
            clickedElement2Parent = item;
            element2Index = +clickedElement2.dataset.id;
            clickedElement2.appendChild(imagesArray2[numberArray[element2Index]]);
            if (clickedElement1Parent === clickedElement2Parent) {
                clickedElement2 = null;
                return;
            }
            item.classList.toggle("clicked");
            if (numberArray[element1Index] === numberArray[element2Index]) {
                clickedElement1.style.backgroundColor = '#301934';
                clickedElement2.style.backgroundColor = '#301934';
                clickedElement1.style.border = '2px solid rgba(249, 160, 0, 0.35)';
                clickedElement2.style.border = '2px solid rgba(249, 160, 0, 0.35)';
                if (clickedElement1Parent._clickWrapper) {
                    clickedElement1Parent.removeEventListener('click', clickedElement1Parent._clickWrapper);
                    delete clickedElement1Parent._clickWrapper;
                }
                if (clickedElement2Parent._clickWrapper) {
                    clickedElement2Parent.removeEventListener('click', clickedElement2Parent._clickWrapper);
                    delete clickedElement2Parent._clickWrapper;
                }
                clickedElement1 = null;
                clickedElement2 = null;
                pairsFound++;
            }
            else {
                clickedElement2.style.border = '4px solid #702963';
                setTimeout(rehideNumber, 1000);

            }
            
            if (pairsFound === Math.floor(NUM_TILES/2)) {
                pairsFound = 0;
                solvePuzzle();
            }
        }

        function rehideNumber () {
            clickedElement1Parent.classList.toggle("clicked");
            clickedElement2Parent.classList.toggle('clicked');
            clickedElement1.style.border = '2px solid rgba(249, 160, 0, 0.35)';
            clickedElement2.style.border = '2px solid rgba(249, 160, 0, 0.35)';
            clickedElement1 = null;
            clickedElement2 = null;
            clickedElement1Parent = null;
            clickedElement2Parent = null;
        }
    }

}
