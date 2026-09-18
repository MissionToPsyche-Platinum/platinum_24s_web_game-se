import { solvePuzzle } from '../gameController.js';
export function startMazePuzzle({ containerID }) {
    const settings = typeof window !== "undefined" ? window.getPyscheSettings?.() : undefined;
    const difficulty = settings?.difficulty === "challenge" ? "challenge" : "normal";

    // const NUM_TILES = 100;
    const NUM_ROWS = 10;
    // const NUM_COLS = 10;
    let location = [];
    let index = 0;

    const NUM_TILES = difficulty === "normal" ? 100 : 400;
    const NUM_COLS = difficulty === "normal" ? 10 : 20;
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

    if (difficulty === 'normal') {
        containerID.innerHTML = `
            <div id="maze-puzzle-layout">
                <header>
                    <h3 id="maze-puzzle-header">Maze Puzzle</h3>
                </header>
                <div class="maze-container" id="gridContainer">
                    <div data-id="0" class="maze-item" tabIndex = "-1", id="start-tile">Start</div>
                    <div data-id="1" class="maze-item">Tile 1</div>
                    <div data-id="2" class="maze-item">Tile 2</div>
                    <div data-id="3" class="maze-item">Tile 3</div>
                    <div data-id="4" class="maze-item">Tile 4</div>
                    <div data-id="5" class="maze-item">Tile 5</div>
                    <div data-id="6" class="maze-item">Tile 6</div>
                    <div data-id="7" class="maze-item">Tile 7</div>
                    <div data-id="8" class="maze-item">Tile 8</div>
                    <div data-id="9" class="maze-item">Tile 9</div>

                    <div data-id="10" class="maze-item">Tile 10</div>
                    <div data-id="11" class="maze-item">Tile 11</div>
                    <div data-id="12" class="maze-item">Tile 12</div>
                    <div data-id="13" class="maze-item">Tile 13</div>
                    <div data-id="14" class="maze-item">Tile 14</div>
                    <div data-id="15" class="maze-item">Tile 15</div>
                    <div data-id="16" class="maze-item">Tile 16</div>
                    <div data-id="17" class="maze-item">Tile 17</div>
                    <div data-id="18" class="maze-item">Tile 18</div>
                    <div data-id="19" class="maze-item">Tile 19</div>

                    <div data-id="20" class="maze-item">Tile 20</div>
                    <div data-id="21" class="maze-item">Tile 21</div>
                    <div data-id="22" class="maze-item">Tile 22</div>
                    <div data-id="23" class="maze-item">Tile 23</div>
                    <div data-id="24" class="maze-item">Tile 24</div>
                    <div data-id="25" class="maze-item">Tile 25</div>
                    <div data-id="26" class="maze-item">Tile 26</div>
                    <div data-id="27" class="maze-item">Tile 27</div>
                    <div data-id="28" class="maze-item">Tile 28</div>
                    <div data-id="29" class="maze-item">Tile 29</div>

                    <div data-id="30" class="maze-item">Tile 30</div>
                    <div data-id="31" class="maze-item">Tile 31</div>
                    <div data-id="32" class="maze-item">Tile 32</div>
                    <div data-id="33" class="maze-item">Tile 33</div>
                    <div data-id="34" class="maze-item">Tile 34</div>
                    <div data-id="35" class="maze-item">Tile 35</div>
                    <div data-id="36" class="maze-item">Tile 36</div>
                    <div data-id="37" class="maze-item">Tile 37</div>
                    <div data-id="38" class="maze-item">Tile 38</div>
                    <div data-id="39" class="maze-item">Tile 39</div>

                    <div data-id="40" class="maze-item">Tile 40</div>
                    <div data-id="41" class="maze-item">Tile 41</div>
                    <div data-id="42" class="maze-item">Tile 42</div>
                    <div data-id="43" class="maze-item">Tile 43</div>
                    <div data-id="44" class="maze-item">Tile 44</div>
                    <div data-id="45" class="maze-item">Tile 45</div>
                    <div data-id="46" class="maze-item">Tile 46</div>
                    <div data-id="47" class="maze-item">Tile 47</div>
                    <div data-id="48" class="maze-item">Tile 48</div>
                    <div data-id="49" class="maze-item">Tile 49</div>

                    <div data-id="50" class="maze-item">Tile 50</div>
                    <div data-id="51" class="maze-item">Tile 51</div>
                    <div data-id="52" class="maze-item">Tile 52</div>
                    <div data-id="53" class="maze-item">Tile 53</div>
                    <div data-id="54" class="maze-item">Tile 54</div>
                    <div data-id="55" class="maze-item">Tile 55</div>
                    <div data-id="56" class="maze-item">Tile 56</div>
                    <div data-id="57" class="maze-item">Tile 57</div>
                    <div data-id="58" class="maze-item">Tile 58</div>
                    <div data-id="59" class="maze-item">Tile 59</div>

                    <div data-id="60" class="maze-item">Tile 60</div>
                    <div data-id="61" class="maze-item">Tile 61</div>
                    <div data-id="62" class="maze-item">Tile 62</div>
                    <div data-id="63" class="maze-item">Tile 63</div>
                    <div data-id="64" class="maze-item">Tile 64</div>
                    <div data-id="65" class="maze-item">Tile 65</div>
                    <div data-id="66" class="maze-item">Tile 66</div>
                    <div data-id="67" class="maze-item">Tile 67</div>
                    <div data-id="68" class="maze-item">Tile 68</div>
                    <div data-id="69" class="maze-item">Tile 69</div>

                    <div data-id="70" class="maze-item">Tile 70</div>
                    <div data-id="71" class="maze-item">Tile 71</div>
                    <div data-id="72" class="maze-item">Tile 72</div>
                    <div data-id="73" class="maze-item">Tile 73</div>
                    <div data-id="74" class="maze-item">Tile 74</div>
                    <div data-id="75" class="maze-item">Tile 75</div>
                    <div data-id="76" class="maze-item">Tile 76</div>
                    <div data-id="77" class="maze-item">Tile 77</div>
                    <div data-id="78" class="maze-item">Tile 78</div>
                    <div data-id="79" class="maze-item">Tile 79</div>

                    <div data-id="80" class="maze-item">Tile 80</div>
                    <div data-id="81" class="maze-item">Tile 81</div>
                    <div data-id="82" class="maze-item">Tile 82</div>
                    <div data-id="83" class="maze-item">Tile 83</div>
                    <div data-id="84" class="maze-item">Tile 84</div>
                    <div data-id="85" class="maze-item">Tile 85</div>
                    <div data-id="86" class="maze-item">Tile 86</div>
                    <div data-id="87" class="maze-item">Tile 87</div>
                    <div data-id="88" class="maze-item">Tile 88</div>
                    <div data-id="89" class="maze-item">Tile 89</div>

                    <div data-id="90" class="maze-item">Tile 90</div>
                    <div data-id="91" class="maze-item">Tile 91</div>
                    <div data-id="92" class="maze-item">Tile 92</div>
                    <div data-id="93" class="maze-item">Tile 93</div>
                    <div data-id="94" class="maze-item">Tile 94</div>
                    <div data-id="95" class="maze-item">Tile 95</div>
                    <div data-id="96" class="maze-item">Tile 96</div>
                    <div data-id="97" class="maze-item">Tile 97</div>
                    <div data-id="98" class="maze-item">Tile 98</div>
                    <div data-id="99" class="maze-item">Tile 99</div>
                </div>
                <div id="maze-buttons">
                    <button id="maze-up-button" class="movement-button">up</button>
                    <button id="maze-down-button" class="movement-button">down</button>
                    <button id="maze-left-button" class="movement-button">left</button>
                    <button id="maze-right-button" class="movement-button">right</button>
                </div>
            </div>
        `;
    }
    else {
        containerID.innerHTML = `
            <div id="maze-puzzle-layout">
                <header>
                    <h3 id="maze-puzzle-header">Maze Puzzle</h3>
                </header>
                <div class="maze-challenge-container" id="gridContainer">
                    <div data-id="0" class="maze-challenge-item" tabIndex = "-1", id="start-tile">Start</div>
                    <div data-id="1" class="maze-challenge-item">Tile 1</div>
                    <div data-id="2" class="maze-challenge-item">Tile 2</div>
                    <div data-id="3" class="maze-challenge-item">Tile 3</div>
                    <div data-id="4" class="maze-challenge-item">Tile 4</div>
                    <div data-id="5" class="maze-challenge-item">Tile 5</div>
                    <div data-id="6" class="maze-challenge-item">Tile 6</div>
                    <div data-id="7" class="maze-challenge-item">Tile 7</div>
                    <div data-id="8" class="maze-challenge-item">Tile 8</div>
                    <div data-id="9" class="maze-challenge-item">Tile 9</div>
                    <div data-id="10" class="maze-challenge-item">Tile 10</div>
                    <div data-id="11" class="maze-challenge-item">Tile 11</div>
                    <div data-id="12" class="maze-challenge-item">Tile 12</div>
                    <div data-id="13" class="maze-challenge-item">Tile 13</div>
                    <div data-id="14" class="maze-challenge-item">Tile 14</div>
                    <div data-id="15" class="maze-challenge-item">Tile 15</div>
                    <div data-id="16" class="maze-challenge-item">Tile 16</div>
                    <div data-id="17" class="maze-challenge-item">Tile 17</div>
                    <div data-id="18" class="maze-challenge-item">Tile 18</div>
                    <div data-id="19" class="maze-challenge-item">Tile 19</div>

                    <div data-id="20" class="maze-challenge-item">Tile 20</div>
                    <div data-id="21" class="maze-challenge-item">Tile 21</div>
                    <div data-id="22" class="maze-challenge-item">Tile 22</div>
                    <div data-id="23" class="maze-challenge-item">Tile 23</div>
                    <div data-id="24" class="maze-challenge-item">Tile 24</div>
                    <div data-id="25" class="maze-challenge-item">Tile 25</div>
                    <div data-id="26" class="maze-challenge-item">Tile 26</div>
                    <div data-id="27" class="maze-challenge-item">Tile 27</div>
                    <div data-id="28" class="maze-challenge-item">Tile 28</div>
                    <div data-id="29" class="maze-challenge-item">Tile 29</div>
                    <div data-id="30" class="maze-challenge-item">Tile 30</div>
                    <div data-id="31" class="maze-challenge-item">Tile 31</div>
                    <div data-id="32" class="maze-challenge-item">Tile 32</div>
                    <div data-id="33" class="maze-challenge-item">Tile 33</div>
                    <div data-id="34" class="maze-challenge-item">Tile 34</div>
                    <div data-id="35" class="maze-challenge-item">Tile 35</div>
                    <div data-id="36" class="maze-challenge-item">Tile 36</div>
                    <div data-id="37" class="maze-challenge-item">Tile 37</div>
                    <div data-id="38" class="maze-challenge-item">Tile 38</div>
                    <div data-id="39" class="maze-challenge-item">Tile 39</div>

                    <div data-id="40" class="maze-challenge-item">Tile 40</div>
                    <div data-id="41" class="maze-challenge-item">Tile 41</div>
                    <div data-id="42" class="maze-challenge-item">Tile 42</div>
                    <div data-id="43" class="maze-challenge-item">Tile 43</div>
                    <div data-id="44" class="maze-challenge-item">Tile 44</div>
                    <div data-id="45" class="maze-challenge-item">Tile 45</div>
                    <div data-id="46" class="maze-challenge-item">Tile 46</div>
                    <div data-id="47" class="maze-challenge-item">Tile 47</div>
                    <div data-id="48" class="maze-challenge-item">Tile 48</div>
                    <div data-id="49" class="maze-challenge-item">Tile 49</div>
                    <div data-id="50" class="maze-challenge-item">Tile 50</div>
                    <div data-id="51" class="maze-challenge-item">Tile 51</div>
                    <div data-id="52" class="maze-challenge-item">Tile 52</div>
                    <div data-id="53" class="maze-challenge-item">Tile 53</div>
                    <div data-id="54" class="maze-challenge-item">Tile 54</div>
                    <div data-id="55" class="maze-challenge-item">Tile 55</div>
                    <div data-id="56" class="maze-challenge-item">Tile 56</div>
                    <div data-id="57" class="maze-challenge-item">Tile 57</div>
                    <div data-id="58" class="maze-challenge-item">Tile 58</div>
                    <div data-id="59" class="maze-challenge-item">Tile 59</div>

                    <div data-id="60" class="maze-challenge-item">Tile 60</div>
                    <div data-id="61" class="maze-challenge-item">Tile 61</div>
                    <div data-id="62" class="maze-challenge-item">Tile 62</div>
                    <div data-id="63" class="maze-challenge-item">Tile 63</div>
                    <div data-id="64" class="maze-challenge-item">Tile 64</div>
                    <div data-id="65" class="maze-challenge-item">Tile 65</div>
                    <div data-id="66" class="maze-challenge-item">Tile 66</div>
                    <div data-id="67" class="maze-challenge-item">Tile 67</div>
                    <div data-id="68" class="maze-challenge-item">Tile 68</div>
                    <div data-id="69" class="maze-challenge-item">Tile 69</div>
                    <div data-id="70" class="maze-challenge-item">Tile 70</div>
                    <div data-id="71" class="maze-challenge-item">Tile 71</div>
                    <div data-id="72" class="maze-challenge-item">Tile 72</div>
                    <div data-id="73" class="maze-challenge-item">Tile 73</div>
                    <div data-id="74" class="maze-challenge-item">Tile 74</div>
                    <div data-id="75" class="maze-challenge-item">Tile 75</div>
                    <div data-id="76" class="maze-challenge-item">Tile 76</div>
                    <div data-id="77" class="maze-challenge-item">Tile 77</div>
                    <div data-id="78" class="maze-challenge-item">Tile 78</div>
                    <div data-id="79" class="maze-challenge-item">Tile 79</div>

                    <div data-id="80" class="maze-challenge-item">Tile 80</div>
                    <div data-id="81" class="maze-challenge-item">Tile 81</div>
                    <div data-id="82" class="maze-challenge-item">Tile 82</div>
                    <div data-id="83" class="maze-challenge-item">Tile 83</div>
                    <div data-id="84" class="maze-challenge-item">Tile 84</div>
                    <div data-id="85" class="maze-challenge-item">Tile 85</div>
                    <div data-id="86" class="maze-challenge-item">Tile 86</div>
                    <div data-id="87" class="maze-challenge-item">Tile 87</div>
                    <div data-id="88" class="maze-challenge-item">Tile 88</div>
                    <div data-id="89" class="maze-challenge-item">Tile 89</div>
                    <div data-id="90" class="maze-challenge-item">Tile 90</div>
                    <div data-id="91" class="maze-challenge-item">Tile 91</div>
                    <div data-id="92" class="maze-challenge-item">Tile 92</div>
                    <div data-id="93" class="maze-challenge-item">Tile 93</div>
                    <div data-id="94" class="maze-challenge-item">Tile 94</div>
                    <div data-id="95" class="maze-challenge-item">Tile 95</div>
                    <div data-id="96" class="maze-challenge-item">Tile 96</div>
                    <div data-id="97" class="maze-challenge-item">Tile 97</div>
                    <div data-id="98" class="maze-challenge-item">Tile 98</div>
                    <div data-id="99" class="maze-challenge-item">Tile 99</div>

                    <div data-id="100" class="maze-challenge-item">Start</div>
                    <div data-id="101" class="maze-challenge-item">Tile 1</div>
                    <div data-id="102" class="maze-challenge-item">Tile 2</div>
                    <div data-id="103" class="maze-challenge-item">Tile 3</div>
                    <div data-id="104" class="maze-challenge-item">Tile 4</div>
                    <div data-id="105" class="maze-challenge-item">Tile 5</div>
                    <div data-id="106" class="maze-challenge-item">Tile 6</div>
                    <div data-id="107" class="maze-challenge-item">Tile 7</div>
                    <div data-id="108" class="maze-challenge-item">Tile 8</div>
                    <div data-id="109" class="maze-challenge-item">Tile 9</div>
                    <div data-id="110" class="maze-challenge-item">Tile 10</div>
                    <div data-id="111" class="maze-challenge-item">Tile 11</div>
                    <div data-id="112" class="maze-challenge-item">Tile 12</div>
                    <div data-id="113" class="maze-challenge-item">Tile 13</div>
                    <div data-id="114" class="maze-challenge-item">Tile 14</div>
                    <div data-id="115" class="maze-challenge-item">Tile 15</div>
                    <div data-id="116" class="maze-challenge-item">Tile 16</div>
                    <div data-id="117" class="maze-challenge-item">Tile 17</div>
                    <div data-id="118" class="maze-challenge-item">Tile 18</div>
                    <div data-id="119" class="maze-challenge-item">Tile 19</div>

                    <div data-id="120" class="maze-challenge-item">Tile 20</div>
                    <div data-id="121" class="maze-challenge-item">Tile 21</div>
                    <div data-id="122" class="maze-challenge-item">Tile 22</div>
                    <div data-id="123" class="maze-challenge-item">Tile 23</div>
                    <div data-id="124" class="maze-challenge-item">Tile 24</div>
                    <div data-id="125" class="maze-challenge-item">Tile 25</div>
                    <div data-id="126" class="maze-challenge-item">Tile 26</div>
                    <div data-id="127" class="maze-challenge-item">Tile 27</div>
                    <div data-id="128" class="maze-challenge-item">Tile 28</div>
                    <div data-id="129" class="maze-challenge-item">Tile 29</div>
                    <div data-id="130" class="maze-challenge-item">Tile 30</div>
                    <div data-id="131" class="maze-challenge-item">Tile 31</div>
                    <div data-id="132" class="maze-challenge-item">Tile 32</div>
                    <div data-id="133" class="maze-challenge-item">Tile 33</div>
                    <div data-id="134" class="maze-challenge-item">Tile 34</div>
                    <div data-id="135" class="maze-challenge-item">Tile 35</div>
                    <div data-id="136" class="maze-challenge-item">Tile 36</div>
                    <div data-id="137" class="maze-challenge-item">Tile 37</div>
                    <div data-id="138" class="maze-challenge-item">Tile 38</div>
                    <div data-id="139" class="maze-challenge-item">Tile 39</div>

                    <div data-id="140" class="maze-challenge-item">Tile 40</div>
                    <div data-id="141" class="maze-challenge-item">Tile 41</div>
                    <div data-id="142" class="maze-challenge-item">Tile 42</div>
                    <div data-id="143" class="maze-challenge-item">Tile 43</div>
                    <div data-id="144" class="maze-challenge-item">Tile 44</div>
                    <div data-id="145" class="maze-challenge-item">Tile 45</div>
                    <div data-id="146" class="maze-challenge-item">Tile 46</div>
                    <div data-id="147" class="maze-challenge-item">Tile 47</div>
                    <div data-id="148" class="maze-challenge-item">Tile 48</div>
                    <div data-id="149" class="maze-challenge-item">Tile 49</div>
                    <div data-id="150" class="maze-challenge-item">Tile 50</div>
                    <div data-id="151" class="maze-challenge-item">Tile 51</div>
                    <div data-id="152" class="maze-challenge-item">Tile 52</div>
                    <div data-id="153" class="maze-challenge-item">Tile 53</div>
                    <div data-id="154" class="maze-challenge-item">Tile 54</div>
                    <div data-id="155" class="maze-challenge-item">Tile 55</div>
                    <div data-id="156" class="maze-challenge-item">Tile 56</div>
                    <div data-id="157" class="maze-challenge-item">Tile 57</div>
                    <div data-id="158" class="maze-challenge-item">Tile 58</div>
                    <div data-id="159" class="maze-challenge-item">Tile 59</div>

                    <div data-id="160" class="maze-challenge-item">Tile 60</div>
                    <div data-id="161" class="maze-challenge-item">Tile 61</div>
                    <div data-id="162" class="maze-challenge-item">Tile 62</div>
                    <div data-id="163" class="maze-challenge-item">Tile 63</div>
                    <div data-id="164" class="maze-challenge-item">Tile 64</div>
                    <div data-id="165" class="maze-challenge-item">Tile 65</div>
                    <div data-id="166" class="maze-challenge-item">Tile 66</div>
                    <div data-id="167" class="maze-challenge-item">Tile 67</div>
                    <div data-id="168" class="maze-challenge-item">Tile 68</div>
                    <div data-id="169" class="maze-challenge-item">Tile 69</div>
                    <div data-id="170" class="maze-challenge-item">Tile 70</div>
                    <div data-id="171" class="maze-challenge-item">Tile 71</div>
                    <div data-id="172" class="maze-challenge-item">Tile 72</div>
                    <div data-id="173" class="maze-challenge-item">Tile 73</div>
                    <div data-id="174" class="maze-challenge-item">Tile 74</div>
                    <div data-id="175" class="maze-challenge-item">Tile 75</div>
                    <div data-id="176" class="maze-challenge-item">Tile 76</div>
                    <div data-id="177" class="maze-challenge-item">Tile 77</div>
                    <div data-id="178" class="maze-challenge-item">Tile 78</div>
                    <div data-id="179" class="maze-challenge-item">Tile 79</div>

                    <div data-id="180" class="maze-challenge-item">Tile 80</div>
                    <div data-id="181" class="maze-challenge-item">Tile 81</div>
                    <div data-id="182" class="maze-challenge-item">Tile 82</div>
                    <div data-id="183" class="maze-challenge-item">Tile 83</div>
                    <div data-id="184" class="maze-challenge-item">Tile 84</div>
                    <div data-id="185" class="maze-challenge-item">Tile 85</div>
                    <div data-id="186" class="maze-challenge-item">Tile 86</div>
                    <div data-id="187" class="maze-challenge-item">Tile 87</div>
                    <div data-id="188" class="maze-challenge-item">Tile 88</div>
                    <div data-id="189" class="maze-challenge-item">Tile 89</div>
                    <div data-id="190" class="maze-challenge-item">Tile 90</div>
                    <div data-id="191" class="maze-challenge-item">Tile 91</div>
                    <div data-id="192" class="maze-challenge-item">Tile 92</div>
                    <div data-id="193" class="maze-challenge-item">Tile 93</div>
                    <div data-id="194" class="maze-challenge-item">Tile 94</div>
                    <div data-id="195" class="maze-challenge-item">Tile 95</div>
                    <div data-id="196" class="maze-challenge-item">Tile 96</div>
                    <div data-id="197" class="maze-challenge-item">Tile 97</div>
                    <div data-id="198" class="maze-challenge-item">Tile 98</div>
                    <div data-id="199" class="maze-challenge-item">Tile 99</div>

                    <div data-id="200" class="maze-challenge-item">Tile 100</div>
                    <div data-id="201" class="maze-challenge-item">Tile 1</div>
                    <div data-id="202" class="maze-challenge-item">Tile 2</div>
                    <div data-id="203" class="maze-challenge-item">Tile 3</div>
                    <div data-id="204" class="maze-challenge-item">Tile 4</div>
                    <div data-id="205" class="maze-challenge-item">Tile 5</div>
                    <div data-id="206" class="maze-challenge-item">Tile 6</div>
                    <div data-id="207" class="maze-challenge-item">Tile 7</div>
                    <div data-id="208" class="maze-challenge-item">Tile 8</div>
                    <div data-id="209" class="maze-challenge-item">Tile 9</div>
                    <div data-id="210" class="maze-challenge-item">Tile 10</div>
                    <div data-id="211" class="maze-challenge-item">Tile 11</div>
                    <div data-id="212" class="maze-challenge-item">Tile 12</div>
                    <div data-id="213" class="maze-challenge-item">Tile 13</div>
                    <div data-id="214" class="maze-challenge-item">Tile 14</div>
                    <div data-id="215" class="maze-challenge-item">Tile 15</div>
                    <div data-id="216" class="maze-challenge-item">Tile 16</div>
                    <div data-id="217" class="maze-challenge-item">Tile 17</div>
                    <div data-id="218" class="maze-challenge-item">Tile 18</div>
                    <div data-id="219" class="maze-challenge-item">Tile 19</div>

                    <div data-id="220" class="maze-challenge-item">Tile 20</div>
                    <div data-id="221" class="maze-challenge-item">Tile 21</div>
                    <div data-id="222" class="maze-challenge-item">Tile 22</div>
                    <div data-id="223" class="maze-challenge-item">Tile 23</div>
                    <div data-id="224" class="maze-challenge-item">Tile 24</div>
                    <div data-id="225" class="maze-challenge-item">Tile 25</div>
                    <div data-id="226" class="maze-challenge-item">Tile 26</div>
                    <div data-id="227" class="maze-challenge-item">Tile 27</div>
                    <div data-id="228" class="maze-challenge-item">Tile 28</div>
                    <div data-id="229" class="maze-challenge-item">Tile 29</div>
                    <div data-id="230" class="maze-challenge-item">Tile 30</div>
                    <div data-id="231" class="maze-challenge-item">Tile 31</div>
                    <div data-id="232" class="maze-challenge-item">Tile 32</div>
                    <div data-id="233" class="maze-challenge-item">Tile 33</div>
                    <div data-id="234" class="maze-challenge-item">Tile 34</div>
                    <div data-id="235" class="maze-challenge-item">Tile 35</div>
                    <div data-id="236" class="maze-challenge-item">Tile 36</div>
                    <div data-id="237" class="maze-challenge-item">Tile 37</div>
                    <div data-id="238" class="maze-challenge-item">Tile 38</div>
                    <div data-id="239" class="maze-challenge-item">Tile 39</div>

                    <div data-id="240" class="maze-challenge-item">Tile 40</div>
                    <div data-id="241" class="maze-challenge-item">Tile 41</div>
                    <div data-id="242" class="maze-challenge-item">Tile 42</div>
                    <div data-id="243" class="maze-challenge-item">Tile 43</div>
                    <div data-id="244" class="maze-challenge-item">Tile 44</div>
                    <div data-id="245" class="maze-challenge-item">Tile 45</div>
                    <div data-id="246" class="maze-challenge-item">Tile 46</div>
                    <div data-id="247" class="maze-challenge-item">Tile 47</div>
                    <div data-id="248" class="maze-challenge-item">Tile 48</div>
                    <div data-id="249" class="maze-challenge-item">Tile 49</div>
                    <div data-id="250" class="maze-challenge-item">Tile 50</div>
                    <div data-id="251" class="maze-challenge-item">Tile 51</div>
                    <div data-id="252" class="maze-challenge-item">Tile 52</div>
                    <div data-id="253" class="maze-challenge-item">Tile 53</div>
                    <div data-id="254" class="maze-challenge-item">Tile 54</div>
                    <div data-id="255" class="maze-challenge-item">Tile 55</div>
                    <div data-id="256" class="maze-challenge-item">Tile 56</div>
                    <div data-id="257" class="maze-challenge-item">Tile 57</div>
                    <div data-id="258" class="maze-challenge-item">Tile 58</div>
                    <div data-id="259" class="maze-challenge-item">Tile 59</div>

                    <div data-id="260" class="maze-challenge-item">Tile 60</div>
                    <div data-id="261" class="maze-challenge-item">Tile 61</div>
                    <div data-id="262" class="maze-challenge-item">Tile 62</div>
                    <div data-id="263" class="maze-challenge-item">Tile 63</div>
                    <div data-id="264" class="maze-challenge-item">Tile 64</div>
                    <div data-id="265" class="maze-challenge-item">Tile 65</div>
                    <div data-id="266" class="maze-challenge-item">Tile 66</div>
                    <div data-id="267" class="maze-challenge-item">Tile 67</div>
                    <div data-id="268" class="maze-challenge-item">Tile 68</div>
                    <div data-id="269" class="maze-challenge-item">Tile 69</div>
                    <div data-id="270" class="maze-challenge-item">Tile 70</div>
                    <div data-id="271" class="maze-challenge-item">Tile 71</div>
                    <div data-id="272" class="maze-challenge-item">Tile 72</div>
                    <div data-id="273" class="maze-challenge-item">Tile 73</div>
                    <div data-id="274" class="maze-challenge-item">Tile 74</div>
                    <div data-id="275" class="maze-challenge-item">Tile 75</div>
                    <div data-id="276" class="maze-challenge-item">Tile 76</div>
                    <div data-id="277" class="maze-challenge-item">Tile 77</div>
                    <div data-id="278" class="maze-challenge-item">Tile 78</div>
                    <div data-id="279" class="maze-challenge-item">Tile 79</div>

                    <div data-id="280" class="maze-challenge-item">Tile 80</div>
                    <div data-id="281" class="maze-challenge-item">Tile 81</div>
                    <div data-id="282" class="maze-challenge-item">Tile 82</div>
                    <div data-id="283" class="maze-challenge-item">Tile 83</div>
                    <div data-id="284" class="maze-challenge-item">Tile 84</div>
                    <div data-id="285" class="maze-challenge-item">Tile 85</div>
                    <div data-id="286" class="maze-challenge-item">Tile 86</div>
                    <div data-id="287" class="maze-challenge-item">Tile 87</div>
                    <div data-id="288" class="maze-challenge-item">Tile 88</div>
                    <div data-id="289" class="maze-challenge-item">Tile 89</div>
                    <div data-id="290" class="maze-challenge-item">Tile 90</div>
                    <div data-id="291" class="maze-challenge-item">Tile 91</div>
                    <div data-id="292" class="maze-challenge-item">Tile 92</div>
                    <div data-id="293" class="maze-challenge-item">Tile 93</div>
                    <div data-id="294" class="maze-challenge-item">Tile 94</div>
                    <div data-id="295" class="maze-challenge-item">Tile 95</div>
                    <div data-id="296" class="maze-challenge-item">Tile 96</div>
                    <div data-id="297" class="maze-challenge-item">Tile 97</div>
                    <div data-id="298" class="maze-challenge-item">Tile 98</div>
                    <div data-id="299" class="maze-challenge-item">Tile 99</div>

                    <div data-id="300" class="maze-challenge-item">Start</div>
                    <div data-id="301" class="maze-challenge-item">Tile 1</div>
                    <div data-id="302" class="maze-challenge-item">Tile 2</div>
                    <div data-id="303" class="maze-challenge-item">Tile 3</div>
                    <div data-id="304" class="maze-challenge-item">Tile 4</div>
                    <div data-id="305" class="maze-challenge-item">Tile 5</div>
                    <div data-id="306" class="maze-challenge-item">Tile 6</div>
                    <div data-id="307" class="maze-challenge-item">Tile 7</div>
                    <div data-id="308" class="maze-challenge-item">Tile 8</div>
                    <div data-id="309" class="maze-challenge-item">Tile 9</div>
                    <div data-id="310" class="maze-challenge-item">Tile 10</div>
                    <div data-id="311" class="maze-challenge-item">Tile 11</div>
                    <div data-id="312" class="maze-challenge-item">Tile 12</div>
                    <div data-id="313" class="maze-challenge-item">Tile 13</div>
                    <div data-id="314" class="maze-challenge-item">Tile 14</div>
                    <div data-id="315" class="maze-challenge-item">Tile 15</div>
                    <div data-id="316" class="maze-challenge-item">Tile 16</div>
                    <div data-id="317" class="maze-challenge-item">Tile 17</div>
                    <div data-id="318" class="maze-challenge-item">Tile 18</div>
                    <div data-id="319" class="maze-challenge-item">Tile 19</div>

                    <div data-id="320" class="maze-challenge-item">Tile 20</div>
                    <div data-id="321" class="maze-challenge-item">Tile 21</div>
                    <div data-id="322" class="maze-challenge-item">Tile 22</div>
                    <div data-id="323" class="maze-challenge-item">Tile 23</div>
                    <div data-id="324" class="maze-challenge-item">Tile 24</div>
                    <div data-id="325" class="maze-challenge-item">Tile 25</div>
                    <div data-id="326" class="maze-challenge-item">Tile 26</div>
                    <div data-id="327" class="maze-challenge-item">Tile 27</div>
                    <div data-id="328" class="maze-challenge-item">Tile 28</div>
                    <div data-id="329" class="maze-challenge-item">Tile 29</div>
                    <div data-id="330" class="maze-challenge-item">Tile 30</div>
                    <div data-id="331" class="maze-challenge-item">Tile 31</div>
                    <div data-id="332" class="maze-challenge-item">Tile 32</div>
                    <div data-id="333" class="maze-challenge-item">Tile 33</div>
                    <div data-id="334" class="maze-challenge-item">Tile 34</div>
                    <div data-id="335" class="maze-challenge-item">Tile 35</div>
                    <div data-id="336" class="maze-challenge-item">Tile 36</div>
                    <div data-id="337" class="maze-challenge-item">Tile 37</div>
                    <div data-id="338" class="maze-challenge-item">Tile 38</div>
                    <div data-id="339" class="maze-challenge-item">Tile 39</div>

                    <div data-id="340" class="maze-challenge-item">Tile 40</div>
                    <div data-id="341" class="maze-challenge-item">Tile 41</div>
                    <div data-id="342" class="maze-challenge-item">Tile 42</div>
                    <div data-id="343" class="maze-challenge-item">Tile 43</div>
                    <div data-id="344" class="maze-challenge-item">Tile 44</div>
                    <div data-id="345" class="maze-challenge-item">Tile 45</div>
                    <div data-id="346" class="maze-challenge-item">Tile 46</div>
                    <div data-id="347" class="maze-challenge-item">Tile 47</div>
                    <div data-id="348" class="maze-challenge-item">Tile 48</div>
                    <div data-id="349" class="maze-challenge-item">Tile 49</div>
                    <div data-id="350" class="maze-challenge-item">Tile 50</div>
                    <div data-id="351" class="maze-challenge-item">Tile 51</div>
                    <div data-id="352" class="maze-challenge-item">Tile 52</div>
                    <div data-id="353" class="maze-challenge-item">Tile 53</div>
                    <div data-id="354" class="maze-challenge-item">Tile 54</div>
                    <div data-id="355" class="maze-challenge-item">Tile 55</div>
                    <div data-id="356" class="maze-challenge-item">Tile 56</div>
                    <div data-id="357" class="maze-challenge-item">Tile 57</div>
                    <div data-id="358" class="maze-challenge-item">Tile 58</div>
                    <div data-id="359" class="maze-challenge-item">Tile 59</div>

                    <div data-id="360" class="maze-challenge-item">Tile 60</div>
                    <div data-id="361" class="maze-challenge-item">Tile 61</div>
                    <div data-id="362" class="maze-challenge-item">Tile 62</div>
                    <div data-id="363" class="maze-challenge-item">Tile 63</div>
                    <div data-id="364" class="maze-challenge-item">Tile 64</div>
                    <div data-id="365" class="maze-challenge-item">Tile 65</div>
                    <div data-id="366" class="maze-challenge-item">Tile 66</div>
                    <div data-id="367" class="maze-challenge-item">Tile 67</div>
                    <div data-id="368" class="maze-challenge-item">Tile 68</div>
                    <div data-id="369" class="maze-challenge-item">Tile 69</div>
                    <div data-id="370" class="maze-challenge-item">Tile 70</div>
                    <div data-id="371" class="maze-challenge-item">Tile 71</div>
                    <div data-id="372" class="maze-challenge-item">Tile 72</div>
                    <div data-id="373" class="maze-challenge-item">Tile 73</div>
                    <div data-id="374" class="maze-challenge-item">Tile 74</div>
                    <div data-id="375" class="maze-challenge-item">Tile 75</div>
                    <div data-id="376" class="maze-challenge-item">Tile 76</div>
                    <div data-id="377" class="maze-challenge-item">Tile 77</div>
                    <div data-id="378" class="maze-challenge-item">Tile 78</div>
                    <div data-id="379" class="maze-challenge-item">Tile 79</div>

                    <div data-id="380" class="maze-challenge-item">Tile 80</div>
                    <div data-id="381" class="maze-challenge-item">Tile 81</div>
                    <div data-id="382" class="maze-challenge-item">Tile 82</div>
                    <div data-id="383" class="maze-challenge-item">Tile 83</div>
                    <div data-id="384" class="maze-challenge-item">Tile 84</div>
                    <div data-id="385" class="maze-challenge-item">Tile 85</div>
                    <div data-id="386" class="maze-challenge-item">Tile 86</div>
                    <div data-id="387" class="maze-challenge-item">Tile 87</div>
                    <div data-id="388" class="maze-challenge-item">Tile 88</div>
                    <div data-id="389" class="maze-challenge-item">Tile 89</div>
                    <div data-id="390" class="maze-challenge-item">Tile 90</div>
                    <div data-id="391" class="maze-challenge-item">Tile 91</div>
                    <div data-id="392" class="maze-challenge-item">Tile 92</div>
                    <div data-id="393" class="maze-challenge-item">Tile 93</div>
                    <div data-id="394" class="maze-challenge-item">Tile 94</div>
                    <div data-id="395" class="maze-challenge-item">Tile 95</div>
                    <div data-id="396" class="maze-challenge-item">Tile 96</div>
                    <div data-id="397" class="maze-challenge-item">Tile 97</div>
                    <div data-id="398" class="maze-challenge-item">Tile 98</div>
                    <div data-id="399" class="maze-challenge-item">Tile 99</div>
                </div>
                <div id="maze-buttons">
                    <button id="maze-up-button" class="movement-button">up</button>
                    <button id="maze-down-button" class="movement-button">down</button>
                    <button id="maze-left-button" class="movement-button">left</button>
                    <button id="maze-right-button" class="movement-button">right</button>
                </div>
            </div>
        `;
    }

    const tileClass = difficulty === "normal" ? ".maze-item" : ".maze-challenge-item";

    const mazeItems = document.querySelectorAll(tileClass);
    populateMazePuzzle();

  
    const startTile = document.querySelector("#start-tile");
    startTile.focus();

    mazeItems.forEach(item => {

        item.addEventListener('keydown', handleKeyDown);
    });

    const upButton = document.getElementById("maze-up-button");
    const downButton = document.getElementById("maze-down-button");
    const rightButton = document.getElementById("maze-right-button");
    const leftButton = document.getElementById("maze-left-button");

    upButton.addEventListener("click", moveUp);
    downButton.addEventListener("click", moveDown);
    rightButton.addEventListener("click", moveRight);
    leftButton.addEventListener("click", moveLeft);

    function populateMazePuzzle () {

        if (difficulty === "normal") {
            createNormalMaze();
        }
        else {
            createChallengeMaze();
        }
        
        setBorderStyle();

        const mazeItems = document.querySelectorAll(tileClass);

        mazeItems.forEach((item, i) => {
            item.textContent = location[i].text;
        });
    }

    function moveUp () {
        if (location[index].top) {
            location[index].text = "";
            index  = index - NUM_COLS;
            location[index].text = 1;
            const mazeItems = document.querySelectorAll(tileClass);
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
            const mazeItems = document.querySelectorAll(tileClass);
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
            const mazeItems = document.querySelectorAll(tileClass);
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
        
            const mazeItems = document.querySelectorAll(tileClass);
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
            const mazeItems = document.querySelectorAll(tileClass);
            mazeItems.forEach(item => {
                item.removeEventListener('keydown', handleKeyDown);
            });

        }
    }

    function setBorderStyle () {
        const mazeItems = document.querySelectorAll(tileClass);

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
    
    function createChallengeMaze () {
        location[0] = new mazeTile(false, false, false, false, 1);
        for (let i = 1; i < NUM_TILES - 1; i++) {
            location[i] = new mazeTile(false, false, false, false, "");
        }
        location[399] = new mazeTile(false, false, false, false, "End");
    }
}
