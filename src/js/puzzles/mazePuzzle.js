import { solvePuzzle } from '../gameController.js';
export function startMazePuzzle({ containerID }) {
    containerID.innerHTML = `
        <div id="maze-puzzle-layout">
            <header>
                <h3 id="maze-puzzle-header">Maze Puzzle</h3>
            </header>
            <div class="maze-container" id="gridContainer">
                <div data-id="0" class="maze-item" tabIndex = "0">Start</div>
                <div data-id="1" class="maze-item" tabIndex = "0">Tile 1</div>
                <div data-id="2" class="maze-item" tabIndex = "0">Tile 2</div>
                <div data-id="3" class="maze-item" tabIndex = "0">Tile 3</div>
                <div data-id="4" class="maze-item" tabIndex = "0">Tile 4</div>
                <div data-id="5" class="maze-item" tabIndex = "0">Tile 5</div>
                <div data-id="6" class="maze-item" tabIndex = "0">Tile 6</div>
                <div data-id="7" class="maze-item" tabIndex = "0">Tile 7</div>
                <div data-id="8" class="maze-item" tabIndex = "0">Tile 8</div>
                <div data-id="9" class="maze-item" tabIndex = "0">Tile 9</div>

                <div data-id="10" class="maze-item" tabIndex = "0">Tile 10</div>
                <div data-id="11" class="maze-item" tabIndex = "0">Tile 11</div>
                <div data-id="12" class="maze-item" tabIndex = "0">Tile 12</div>
                <div data-id="13" class="maze-item" tabIndex = "0">Tile 13</div>
                <div data-id="14" class="maze-item" tabIndex = "0">Tile 14</div>
                <div data-id="15" class="maze-item" tabIndex = "0">Tile 15</div>
                <div data-id="16" class="maze-item" tabIndex = "0">Tile 16</div>
                <div data-id="17" class="maze-item" tabIndex = "0">Tile 17</div>
                <div data-id="18" class="maze-item" tabIndex = "0">Tile 18</div>
                <div data-id="19" class="maze-item" tabIndex = "0">Tile 19</div>

                <div data-id="20" class="maze-item" tabIndex = "0">Tile 20</div>
                <div data-id="21" class="maze-item" tabIndex = "0">Tile 21</div>
                <div data-id="22" class="maze-item" tabIndex = "0">Tile 22</div>
                <div data-id="23" class="maze-item" tabIndex = "0">Tile 23</div>
                <div data-id="24" class="maze-item" tabIndex = "0">Tile 24</div>
                <div data-id="25" class="maze-item" tabIndex = "0">Tile 25</div>
                <div data-id="26" class="maze-item" tabIndex = "0">Tile 26</div>
                <div data-id="27" class="maze-item" tabIndex = "0">Tile 27</div>
                <div data-id="28" class="maze-item" tabIndex = "0">Tile 28</div>
                <div data-id="29" class="maze-item" tabIndex = "0">Tile 29</div>

                <div data-id="30" class="maze-item" tabIndex = "0">Tile 30</div>
                <div data-id="31" class="maze-item" tabIndex = "0">Tile 31</div>
                <div data-id="32" class="maze-item" tabIndex = "0">Tile 32</div>
                <div data-id="33" class="maze-item" tabIndex = "0">Tile 33</div>
                <div data-id="34" class="maze-item" tabIndex = "0">Tile 34</div>
                <div data-id="35" class="maze-item" tabIndex = "0">Tile 35</div>
                <div data-id="36" class="maze-item" tabIndex = "0">Tile 36</div>
                <div data-id="37" class="maze-item" tabIndex = "0">Tile 37</div>
                <div data-id="38" class="maze-item" tabIndex = "0">Tile 38</div>
                <div data-id="39" class="maze-item" tabIndex = "0">Tile 39</div>

                <div data-id="40" class="maze-item" tabIndex = "0">Tile 40</div>
                <div data-id="41" class="maze-item" tabIndex = "0">Tile 41</div>
                <div data-id="42" class="maze-item" tabIndex = "0">Tile 42</div>
                <div data-id="43" class="maze-item" tabIndex = "0">Tile 43</div>
                <div data-id="44" class="maze-item" tabIndex = "0">Tile 44</div>
                <div data-id="45" class="maze-item" tabIndex = "0">Tile 45</div>
                <div data-id="46" class="maze-item" tabIndex = "0">Tile 46</div>
                <div data-id="47" class="maze-item" tabIndex = "0">Tile 47</div>
                <div data-id="48" class="maze-item" tabIndex = "0">Tile 48</div>
                <div data-id="49" class="maze-item" tabIndex = "0">Tile 49</div>

                <div data-id="50" class="maze-item" tabIndex = "0">Tile 50</div>
                <div data-id="51" class="maze-item" tabIndex = "0">Tile 51</div>
                <div data-id="52" class="maze-item" tabIndex = "0">Tile 52</div>
                <div data-id="53" class="maze-item" tabIndex = "0">Tile 53</div>
                <div data-id="54" class="maze-item" tabIndex = "0">Tile 54</div>
                <div data-id="55" class="maze-item" tabIndex = "0">Tile 55</div>
                <div data-id="56" class="maze-item" tabIndex = "0">Tile 56</div>
                <div data-id="57" class="maze-item" tabIndex = "0">Tile 57</div>
                <div data-id="58" class="maze-item" tabIndex = "0">Tile 58</div>
                <div data-id="59" class="maze-item" tabIndex = "0">Tile 59</div>

                <div data-id="60" class="maze-item" tabIndex = "0">Tile 60</div>
                <div data-id="61" class="maze-item" tabIndex = "0">Tile 61</div>
                <div data-id="62" class="maze-item" tabIndex = "0">Tile 62</div>
                <div data-id="63" class="maze-item" tabIndex = "0">Tile 63</div>
                <div data-id="64" class="maze-item" tabIndex = "0">Tile 64</div>
                <div data-id="65" class="maze-item" tabIndex = "0">Tile 65</div>
                <div data-id="66" class="maze-item" tabIndex = "0">Tile 66</div>
                <div data-id="67" class="maze-item" tabIndex = "0">Tile 67</div>
                <div data-id="68" class="maze-item" tabIndex = "0">Tile 68</div>
                <div data-id="69" class="maze-item" tabIndex = "0">Tile 69</div>

                <div data-id="70" class="maze-item" tabIndex = "0">Tile 70</div>
                <div data-id="71" class="maze-item" tabIndex = "0">Tile 71</div>
                <div data-id="72" class="maze-item" tabIndex = "0">Tile 72</div>
                <div data-id="73" class="maze-item" tabIndex = "0">Tile 73</div>
                <div data-id="74" class="maze-item" tabIndex = "0">Tile 74</div>
                <div data-id="75" class="maze-item" tabIndex = "0">Tile 75</div>
                <div data-id="76" class="maze-item" tabIndex = "0">Tile 76</div>
                <div data-id="77" class="maze-item" tabIndex = "0">Tile 77</div>
                <div data-id="78" class="maze-item" tabIndex = "0">Tile 78</div>
                <div data-id="79" class="maze-item" tabIndex = "0">Tile 79</div>

                <div data-id="80" class="maze-item" tabIndex = "0">Tile 80</div>
                <div data-id="81" class="maze-item" tabIndex = "0">Tile 81</div>
                <div data-id="82" class="maze-item" tabIndex = "0">Tile 82</div>
                <div data-id="83" class="maze-item" tabIndex = "0">Tile 83</div>
                <div data-id="84" class="maze-item" tabIndex = "0">Tile 84</div>
                <div data-id="85" class="maze-item" tabIndex = "0">Tile 85</div>
                <div data-id="86" class="maze-item" tabIndex = "0">Tile 86</div>
                <div data-id="87" class="maze-item" tabIndex = "0">Tile 87</div>
                <div data-id="88" class="maze-item" tabIndex = "0">Tile 88</div>
                <div data-id="89" class="maze-item" tabIndex = "0">Tile 89</div>

                <div data-id="90" class="maze-item" tabIndex = "0">Tile 90</div>
                <div data-id="91" class="maze-item" tabIndex = "0">Tile 91</div>
                <div data-id="92" class="maze-item" tabIndex = "0">Tile 92</div>
                <div data-id="93" class="maze-item" tabIndex = "0">Tile 93</div>
                <div data-id="94" class="maze-item" tabIndex = "0">Tile 94</div>
                <div data-id="95" class="maze-item" tabIndex = "0">Tile 95</div>
                <div data-id="96" class="maze-item" tabIndex = "0">Tile 96</div>
                <div data-id="97" class="maze-item" tabIndex = "0">Tile 97</div>
                <div data-id="98" class="maze-item" tabIndex = "0">Tile 98</div>
                <div data-id="99" class="maze-item" tabIndex = "0">Tile 99</div>
            </div>
            <div id="buttons">
                <button id="up-button>up</button>
                <button id="down-button>down</button>
                <button id="left-button>left</button>
                <button id="right-button>right</button>
            </div>
        </div>
    `;

    const mazeItems = document.querySelectorAll(".maze-item");
    populateMazePuzzle();

    mazeItems.forEach(item => {
        item.addEventListener('keydown', handleKeyDown);
    });

}

const NUM_TILES = 100;
const NUM_ROWS = 10;
const NUM_COLS = 10;
let location = [];
let index = 0;
class mazeTile {
    constructor(top, bottom, left, right, text) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.text = text;
        // this.position = position;
    }
}

function populateMazePuzzle () {

    createNormalMaze();
    
    setBorderStyle();

    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, i) => {
        item.textContent = location[i].text;
    });
}

function moveUp () {
    if (location[index].top) {
        location[index].text = "";
        index  = index - NUM_COLS;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveDown () {
    if (location[index].bottom) {
        location[index].text = "";
        index  = index + NUM_COLS;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveRight () {
    if (location[index].right) {
        location[index].text = "";
        index++;
        location[index].text = 1;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function moveLeft () {
    if (location[index].left) {
        location[index].text = "";
        index--;
        location[index].text = 1;
    
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
        detectWin();
    }
}

function detectWin () {
    if (index === NUM_TILES - 1) {
        solvePuzzle();
        index = 0;
        const mazeItems = document.querySelectorAll(".maze-item");
        mazeItems.forEach(item => {
            item.removeEventListener('keydown', handleKeyDown);
        });

    }
}

function setBorderStyle () {
    const mazeItems = document.querySelectorAll(".maze-item");

    mazeItems.forEach((item, i) => {
        if (location[i].top) {
            item.style.borderTop = 'none'; 
        }
        if (location[i].bottom) {
            item.style.borderBottom = 'none';
        }
        if (location[i].left) {
            item.style.borderLeft = 'none';
        }
        if (location[i].right) {
            item.style.borderRight = 'none';
        }
    });
}

function handleKeyDown (event) {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            moveUp();
            break;
        case "ArrowDown":
            event.preventDefault();
            moveDown();
            break;
        case "ArrowLeft":
            event.preventDefault();
            moveLeft();
            break;
        case "ArrowRight":
            event.preventDefault();
            moveRight();
            break;
    }
}

function createOriginalMaze () {
    location[0] = new mazeTile(false, true, false, false, 1);
    location[1] = new mazeTile(false, true, false, true, "");
    location[2] = new mazeTile(false, false, true, true, "");
    location[3] = new mazeTile(false, true, true, false, "");

    location[4] = new mazeTile(true, false, false, true, "");
    location[5] = new mazeTile(true, false, true, false, "");
    location[6] = new mazeTile(false, false, false, false, "");
    location[7] = new mazeTile(true, true, false, false, "");

    location[8] = new mazeTile(false, true, false, true, "");
    location[9] = new mazeTile(false, false, true, true, "");
    location[10] = new mazeTile(false, false, true, true, "");
    location[11] = new mazeTile(true, false, true, false, "");

    location[12] = new mazeTile(true, false, false, true, "");
    location[13] = new mazeTile(false, false, true, true, "");
    location[14] = new mazeTile(false, false, true, true, "");
    location[15] = new mazeTile(false, false, true, false, "End");
}

function createNormalMaze() {
    location[0] = new mazeTile(false, true, false, false, 1);
    location[1] = new mazeTile(false, true, false, true, "");
    location[2] = new mazeTile(false, false, true, false, "");
    location[3] = new mazeTile(false, true, false, true, "");
    location[4] = new mazeTile(false, false, true, true, "");
    location[5] = new mazeTile(false, true, true, false, "");
    location[6] = new mazeTile(false, true, false, true, "");
    location[7] = new mazeTile(false, false, true, false, "");
    location[8] = new mazeTile(false, true, false, true, "");
    location[9] = new mazeTile(false, true, true, false, "");

    location[10] = new mazeTile(true, true, false, false, "");
    location[11] = new mazeTile(true, false, false, false, "");
    location[12] = new mazeTile(false, true, false, true, "");
    location[13] = new mazeTile(true, false, true, false, "");
    location[14] = new mazeTile(false, false, false, false, "");
    location[15] = new mazeTile(true, true, false, false, "");
    location[16] = new mazeTile(true, false, false, false, "");
    location[17] = new mazeTile(false, true, false, true, "");
    location[18] = new mazeTile(true, false, true, false, "");
    location[19] = new mazeTile(true, true, false, false, "");

    location[20] = new mazeTile(true, false, false, true, "");
    location[21] = new mazeTile(false, false, true, true, "");
    location[22] = new mazeTile(true, false, true, false, "");
    location[23] = new mazeTile(false, true, false, false, "");
    location[24] = new mazeTile(false, true, false, true, "");
    location[25] = new mazeTile(true, false, true, false, "");
    location[26] = new mazeTile(false, true, false, true, "");
    location[27] = new mazeTile(true, false, true, false, "");
    location[28] = new mazeTile(false, false, false, false, "");
    location[29] = new mazeTile(true, true, false, false, "");

    location[30] = new mazeTile(false, false, false, false, "");
    location[31] = new mazeTile(false, true, false, true, "");
    location[32] = new mazeTile(false, true, true, false, "");
    location[33] = new mazeTile(true, false, false, false, "");
    location[34] = new mazeTile(true, true, false, false, "");
    location[35] = new mazeTile(false, true, false, true, "");
    location[36] = new mazeTile(true, false, true, false, "");
    location[37] = new mazeTile(false, true, false, false, "");
    location[38] = new mazeTile(false, true, false, true, "");
    location[39] = new mazeTile(true, false, true, false, "");

    location[40] = new mazeTile(false, true, false, true, "");
    location[41] = new mazeTile(true, false, true, false, "");
    location[42] = new mazeTile(true, false, false, true, "");
    location[43] = new mazeTile(false, false, true, true, "");
    location[44] = new mazeTile(true, false, true, false, "");
    location[45] = new mazeTile(true, false, false, true, "");
    location[46] = new mazeTile(false, true, true, false, "");
    location[47] = new mazeTile(true, false, false, false, "");
    location[48] = new mazeTile(true, false, false, true, "");
    location[49] = new mazeTile(false, true, true, false, "");

    location[50] = new mazeTile(true, true, false, false, "");
    location[51] = new mazeTile(false, false, false, true, "");
    location[52] = new mazeTile(false, false, true, true, "");
    location[53] = new mazeTile(false, true, true, true, "");
    location[54] = new mazeTile(false, false, true, true, "");
    location[55] = new mazeTile(false, false, true, false, "");
    location[56] = new mazeTile(true, false, false, true, "");
    location[57] = new mazeTile(false, true, true, false, "");
    location[58] = new mazeTile(false, true, false, true, "");
    location[59] = new mazeTile(true, false, true, false, "");

    location[60] = new mazeTile(true, false, false, true, "");
    location[61] = new mazeTile(false, false, true, true, "");
    location[62] = new mazeTile(false, true, true, false, "");
    location[63] = new mazeTile(true, true, false, false, "");
    location[64] = new mazeTile(false, true, false, true, "");
    location[65] = new mazeTile(false, true, true, false, "");
    location[66] = new mazeTile(false, true, false, false, "");
    location[67] = new mazeTile(true, true, false, false, "");
    location[68] = new mazeTile(true, false, false, true, "");
    location[69] = new mazeTile(false, true, true, false, "");

    location[70] = new mazeTile(false, true, false, true, "");
    location[71] = new mazeTile(false, true, true, false, "");
    location[72] = new mazeTile(true, true, false, false, "");
    location[73] = new mazeTile(true, true, false, false, "");
    location[74] = new mazeTile(true, true, false, false, "");
    location[75] = new mazeTile(true, true, false, false, "");
    location[76] = new mazeTile(true, false, false, false, "");
    location[77] = new mazeTile(true, false, false, true, "");
    location[78] = new mazeTile(false, true, true, false, "");
    location[79] = new mazeTile(true, true, false, false, "");

    location[80] = new mazeTile(true, true, false, false, "");
    location[81] = new mazeTile(true, false, false, true, "");
    location[82] = new mazeTile(true, false, true, false, "");
    location[83] = new mazeTile(true, false, false, false, "");
    location[84] = new mazeTile(true, true, false, false, "");
    location[85] = new mazeTile(true, false, false, true, "");
    location[86] = new mazeTile(false, true, true, false, "");
    location[87] = new mazeTile(false, false, false, false, "");
    location[88] = new mazeTile(true, true, false, false, "");
    location[89] = new mazeTile(true, true, false, false, "");

    location[90] = new mazeTile(true, false, false, true, "");
    location[91] = new mazeTile(false, false, true, true, "");
    location[92] = new mazeTile(false, false, true, true, "");
    location[93] = new mazeTile(false, false, true, true, "");
    location[94] = new mazeTile(true, false, true, false, "");
    location[95] = new mazeTile(false, false, false, false, "");
    location[96] = new mazeTile(true, false, false, true, "");
    location[97] = new mazeTile(false, false, true, true, "");
    location[98] = new mazeTile(true, false, true, false, "");
    location[99] = new mazeTile(true, false, false, false, "End");
    
}

function arrowButtons () {

}