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
        if (index - NUM_COLS < 0) {
            return;
        }
        if (location[index].top && location[index - NUM_COLS].bottom) {
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
        if (index + NUM_COLS >= location.length) {
            return;
        }
        if (location[index].bottom && location[index + NUM_COLS].top) {
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
        if (index >= 19 && (index - 19) % 20 === 0 && index < array.length) {
            return
        }
        if (location[index].right && location[index + 1].left) {
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
        if (index % 20 === 0) {
            return;
        }
        if (location[index].left && location[index - 1].right) {
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

            upButton.removeEventListener("click", moveUp);
            downButton.removeEventListener("click", moveDown);
            rightButton.removeEventListener("click", moveRight);
            leftButton.removeEventListener("click", moveLeft);

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
        location[0] = new mazeTile(false, false, false, true, 1);
        location[1] = new mazeTile(false, true, true, false, "");
        location[2] = new mazeTile(false, true, false, false, "");
        location[3] = new mazeTile(false, true, false, true, "");
        location[4] = new mazeTile(false, false, true, true, "");
        location[5] = new mazeTile(false, false, true, true, "");
        location[6] = new mazeTile(false, true, true, false, "");
        location[7] = new mazeTile(false, false, false, true, "");
        location[8] = new mazeTile(false, false, true, false, "");
        location[9] = new mazeTile(false, true, false, true, "");
        location[10] = new mazeTile(false, true, true, false, "");
        location[11] = new mazeTile(false, true, false, true, "");
        location[12] = new mazeTile(false, true, true, false, "");
        location[13] = new mazeTile(false, true, false, true, "");
        location[14] = new mazeTile(false, false, true, true, "");
        location[15] = new mazeTile(false, false, true, true, "");
        location[16] = new mazeTile(false, true, true, false, "");
        location[17] = new mazeTile(false, false, false, true, "");
        location[18] = new mazeTile(false, true, true, true, "");
        location[19] = new mazeTile(false, true, true, false, "");

        location[20] = new mazeTile(false, true, false, false, "");
        location[21] = new mazeTile(true, true, false, false, "");
        location[22] = new mazeTile(true, false, false, false, "");
        location[23] = new mazeTile(true, true, false, false, "");
        location[24] = new mazeTile(false, true, false, true, "");
        location[25] = new mazeTile(false, true, true, false, "");
        location[26] = new mazeTile(true, false, false, true, "");
        location[27] = new mazeTile(false, true, true, true, "");
        location[28] = new mazeTile(false, false, true, true, "");
        location[29] = new mazeTile(true, false, true, false, "");
        location[30] = new mazeTile(true, true, false, false, "");
        location[31] = new mazeTile(true, true, false, true, "");
        location[32] = new mazeTile(true, true, true, false, "");
        location[33] = new mazeTile(true, true, false, false, "");
        location[34] = new mazeTile(false, false, false, true, "");
        location[35] = new mazeTile(false, false, true, false, "");
        location[36] = new mazeTile(true, false, false, true, "");
        location[37] = new mazeTile(false, true, true, false, "");
        location[38] = new mazeTile(true, true, false, true, "");
        location[39] = new mazeTile(true, true, true, false, "");

        location[40] = new mazeTile(true, false, false, false, "");
        location[41] = new mazeTile(true, true, false, true, "");
        location[42] = new mazeTile(false, false, true, true, "");
        location[43] = new mazeTile(true, true, true, false, "");
        location[44] = new mazeTile(true, true, false, true, "");
        location[45] = new mazeTile(true, true, true, true, "");
        location[46] = new mazeTile(false, true, true, false, "");
        location[47] = new mazeTile(true, false, false, false, "");
        location[48] = new mazeTile(false, true, false, false, "");
        location[49] = new mazeTile(false, true, false, true, "");
        location[50] = new mazeTile(true, false, true, false, "");
        location[51] = new mazeTile(true, false, false, true, "");
        location[52] = new mazeTile(true, true, true, false, "");
        location[53] = new mazeTile(true, false, false, true, "");
        location[54] = new mazeTile(false, false, true, true, "");
        location[55] = new mazeTile(false, true, true, false, "");
        location[56] = new mazeTile(false, true, false, false, "");
        location[57] = new mazeTile(true, true, false, false, "");
        location[58] = new mazeTile(true, false, false, true, "");
        location[59] = new mazeTile(true, true, true, false, "");

        location[60] = new mazeTile(false, true, false, true, "");
        location[61] = new mazeTile(true, false, true, false, "");
        location[62] = new mazeTile(false, true, false, false, "");
        location[63] = new mazeTile(true, true, false, false, "");
        location[64] = new mazeTile(true, false, false, true, "");
        location[65] = new mazeTile(true, false, true, true, "");
        location[66] = new mazeTile(true, true, true, true, "");
        location[67] = new mazeTile(false, false, true, true, "");
        location[68] = new mazeTile(true, false, true, false, "");
        location[69] = new mazeTile(true, true, false, false, "");
        location[70] = new mazeTile(false, true, false, false, "");
        location[71] = new mazeTile(false, true, false, false, "");
        location[72] = new mazeTile(true, false, false, true, "");
        location[73] = new mazeTile(false, true, true, true, "");
        location[74] = new mazeTile(false, false, true, false, "");
        location[75] = new mazeTile(true, true, false, false, "");
        location[76] = new mazeTile(true, true, false, false, "");
        location[77] = new mazeTile(true, false, false, true, "");
        location[78] = new mazeTile(false, true, true, false, "");
        location[79] = new mazeTile(true, true, false, false, "");

        location[80] = new mazeTile(true, true, false, false, "");
        location[81] = new mazeTile(false, false, false, false, "");
        location[82] = new mazeTile(true, true, false, false, "");
        location[83] = new mazeTile(true, false, false, true, "");
        location[84] = new mazeTile(false, false, true, true, "");
        location[85] = new mazeTile(false, true, true, false, "");
        location[86] = new mazeTile(true, false, false, false, "");
        location[87] = new mazeTile(false, true, false, false, "");
        location[88] = new mazeTile(false, true, false, true, "");
        location[89] = new mazeTile(true, false, true, false, "");
        location[90] = new mazeTile(true, true, false, false, "");
        location[91] = new mazeTile(true, false, false, true, "");
        location[92] = new mazeTile(false, true, true, false, "");
        location[93] = new mazeTile(true, true, false, false, "");
        location[94] = new mazeTile(false, true, false, true, "");
        location[95] = new mazeTile(true, false, true, false, "");
        location[96] = new mazeTile(true, true, false, false, "");
        location[97] = new mazeTile(false, true, false, true, "");
        location[98] = new mazeTile(true, false, true, false, "");
        location[99] = new mazeTile(true, true, false, false, "");

        location[100] = new mazeTile(true, false, false, true, "");
        location[101] = new mazeTile(false, false, true, true, "");
        location[102] = new mazeTile(true, false, true, false, "");
        location[103] = new mazeTile(false, false, false, true, "");
        location[104] = new mazeTile(false, false, true, false, "");
        location[105] = new mazeTile(true, true, false, true, "");
        location[106] = new mazeTile(false, false, true, true, "");
        location[107] = new mazeTile(true, true, true, false, "");
        location[108] = new mazeTile(true, true, false, false, "");
        location[109] = new mazeTile(false, false, false, true, "");
        location[110] = new mazeTile(true, false, true, true, "");
        location[111] = new mazeTile(false, false, true, false, "");
        location[112] = new mazeTile(true, true, false, false, "");
        location[113] = new mazeTile(true, false, false, false, "");
        location[114] = new mazeTile(true, true, false, false, "");
        location[115] = new mazeTile(false, false, false, true, "");
        location[116] = new mazeTile(true, true, true, false, "");
        location[117] = new mazeTile(true, true, false, false, "");
        location[118] = new mazeTile(false, false, false, true, "");
        location[119] = new mazeTile(true, true, true, false, "");

        location[120] = new mazeTile(false, false, false, true, "");
        location[121] = new mazeTile(false, false, true, false, "");
        location[122] = new mazeTile(false, true, false, true, "");
        location[123] = new mazeTile(false, false, true, true, "");
        location[124] = new mazeTile(false, false, true, true, "");
        location[125] = new mazeTile(true, false, true, false, "");
        location[126] = new mazeTile(false, false, false, false, "");
        location[127] = new mazeTile(true, true, false, false, "");
        location[128] = new mazeTile(true, false, false, true, "");
        location[129] = new mazeTile(false, false, true, true, "");
        location[130] = new mazeTile(false, true, true, true, "");
        location[131] = new mazeTile(false, false, true, true, "");
        location[132] = new mazeTile(true, false, true, false, "");
        location[133] = new mazeTile(false, true, false, true, "");
        location[134] = new mazeTile(true, false, true, true, "");
        location[135] = new mazeTile(false, false, true, false, "");
        location[136] = new mazeTile(true, false, false, false, "");
        location[137] = new mazeTile(true, false, false, true, "");
        location[138] = new mazeTile(false, true, true, false, "");
        location[139] = new mazeTile(true, true, false, false, "");

        location[140] = new mazeTile(false, false, false, true, "");
        location[141] = new mazeTile(false, false, true, true, "");
        location[142] = new mazeTile(true, true, true, false, "");
        location[143] = new mazeTile(false, true, false, true, "");
        location[144] = new mazeTile(false, false, true, true, "");
        location[145] = new mazeTile(false, true, true, false, "");
        location[146] = new mazeTile(false, false, false, true, "");
        location[147] = new mazeTile(true, true, true, false, "");
        location[148] = new mazeTile(false, true, false, false, "");
        location[149] = new mazeTile(false, true, false, true, "");
        location[150] = new mazeTile(true, false, true, false, "");
        location[151] = new mazeTile(false, true, false, true, "");
        location[152] = new mazeTile(false, true, true, false, "");
        location[153] = new mazeTile(true, true, false, false, "");
        location[154] = new mazeTile(false, true, false, false, "");
        location[155] = new mazeTile(false, true, false, true, "");
        location[156] = new mazeTile(false, true, true, false, "");
        location[157] = new mazeTile(false, false, false, false, "");
        location[158] = new mazeTile(true, true, false, false, "");
        location[159] = new mazeTile(true, true, false, false, "");

        location[160] = new mazeTile(false, true, false, true, "");
        location[161] = new mazeTile(false, true, true, false, "");
        location[162] = new mazeTile(true, true, false, false, "");
        location[163] = new mazeTile(true, false, false, false, "");
        location[164] = new mazeTile(false, true, false, false, "");
        location[165] = new mazeTile(true, false, false, true, "");
        location[166] = new mazeTile(false, true, true, false, "");
        location[167] = new mazeTile(true, false, false, false, "");
        location[168] = new mazeTile(true, false, false, false, "");
        location[169] = new mazeTile(true, true, false, false, "");
        location[170] = new mazeTile(false, true, false, true, "");
        location[171] = new mazeTile(true, false, true, true, "");
        location[172] = new mazeTile(true, false, true, false, "");
        location[173] = new mazeTile(true, true, false, false, "");
        location[174] = new mazeTile(true, true, false, false, "");
        location[175] = new mazeTile(true, true, false, false, "");
        location[176] = new mazeTile(true, false, false, true, "");
        location[177] = new mazeTile(false, false, true, true, "");
        location[178] = new mazeTile(true, false, true, false, "");
        location[179] = new mazeTile(true, true, false, false, "");

        location[180] = new mazeTile(true, true, false, true, "");
        location[181] = new mazeTile(true, true, true, false, "");
        location[182] = new mazeTile(true, false, false, true, "");
        location[183] = new mazeTile(false, true, true, true, "");
        location[184] = new mazeTile(true, false, true, true, "");
        location[185] = new mazeTile(false, false, true, false, "");
        location[186] = new mazeTile(true, true, false, false, "");
        location[187] = new mazeTile(false, true, false, true, "");
        location[188] = new mazeTile(false, false, true, true, "");
        location[189] = new mazeTile(true, false, true, false, "");
        location[190] = new mazeTile(true, true, false, false, "");
        location[191] = new mazeTile(false, true, false, true, "");
        location[192] = new mazeTile(false, false, true, true, "");
        location[193] = new mazeTile(true, false, true, false, "");
        location[194] = new mazeTile(true, false, false, false, "");
        location[195] = new mazeTile(true, true, false, false, "");
        location[196] = new mazeTile(false, false, false, true, "");
        location[197] = new mazeTile(false, true, true, true, "");
        location[198] = new mazeTile(false, false, true, true, "");
        location[199] = new mazeTile(true, false, true, false, "");

        location[200] = new mazeTile(true, true, false, true, "");
        location[201] = new mazeTile(true, false, true, true, "");
        location[202] = new mazeTile(false, false, true, false, "");
        location[203] = new mazeTile(true, true, false, false, "");
        location[204] = new mazeTile(false, false, false, true, "");
        location[205] = new mazeTile(false, false, true, true, "");
        location[206] = new mazeTile(true, false, true, false, "");
        location[207] = new mazeTile(true, true, false, false, "");
        location[208] = new mazeTile(false, true, false, true, "");
        location[209] = new mazeTile(false, false, true, true, "");
        location[210] = new mazeTile(true, true, true, false, "");
        location[211] = new mazeTile(true, true, false, false, "");
        location[212] = new mazeTile(false, false, false, true, "");
        location[213] = new mazeTile(false, false, true, false, "");
        location[214] = new mazeTile(false, true, false, true, "");
        location[215] = new mazeTile(true, false, true, true, "");
        location[216] = new mazeTile(false, true, true, false, "");
        location[217] = new mazeTile(true, false, false, false, "");
        location[218] = new mazeTile(false, true, false, true, "");
        location[219] = new mazeTile(false, false, true, false, "");

        location[220] = new mazeTile(true, true, false, false, "");
        location[221] = new mazeTile(false, true, false, false, "");
        location[222] = new mazeTile(false, false, false, true, "");
        location[223] = new mazeTile(true, false, true, false, "");
        location[224] = new mazeTile(false, true, false, true, "");
        location[225] = new mazeTile(false, false, true, true, "");
        location[226] = new mazeTile(false, false, true, true, "");
        location[227] = new mazeTile(true, false, true, false, "");
        location[228] = new mazeTile(true, false, false, false, "");
        location[229] = new mazeTile(false, true, false, false, "");
        location[230] = new mazeTile(true, false, false, false, "");
        location[231] = new mazeTile(true, false, false, true, "");
        location[232] = new mazeTile(false, true, true, false, "");
        location[233] = new mazeTile(false, true, false, true, "");
        location[234] = new mazeTile(true, false, true, false, "");
        location[235] = new mazeTile(false, true, false, false, "");
        location[236] = new mazeTile(true, false, false, true, "");
        location[237] = new mazeTile(false, false, true, true, "");
        location[238] = new mazeTile(true, false, true, false, "");
        location[239] = new mazeTile(false, true, false, false, "");

        location[240] = new mazeTile(true, true, false, false, "");
        location[241] = new mazeTile(true, true, false, true, "");
        location[242] = new mazeTile(false, false, true, true, "");
        location[243] = new mazeTile(false, true, true, false, "");
        location[244] = new mazeTile(true, false, false, true, "");
        location[245] = new mazeTile(false, true, true, false, "");
        location[246] = new mazeTile(false, true, false, false, "");
        location[247] = new mazeTile(false, true, false, true, "");
        location[248] = new mazeTile(false, false, true, true, "");
        location[249] = new mazeTile(true, false, true, true, "");
        location[250] = new mazeTile(false, true, true, false, "");
        location[251] = new mazeTile(false, false, false, false, "");
        location[252] = new mazeTile(true, true, false, false, "");
        location[253] = new mazeTile(true, false, false, true, "");
        location[254] = new mazeTile(false, true, true, false, "");
        location[255] = new mazeTile(true, true, false, true, "");
        location[256] = new mazeTile(false, true, true, false, "");
        location[257] = new mazeTile(false, true, false, true, "");
        location[258] = new mazeTile(false, true, true, false, "");
        location[259] = new mazeTile(true, false, false, false, "");

        location[260] = new mazeTile(true, false, false, false, "");
        location[261] = new mazeTile(true, true, false, false, "");
        location[262] = new mazeTile(false, true, false, false, "");
        location[263] = new mazeTile(true, true, false, false, "");
        location[264] = new mazeTile(false, false, false, false, "");
        location[265] = new mazeTile(true, true, false, false, "");
        location[266] = new mazeTile(true, true, false, false, "");
        location[267] = new mazeTile(true, true, false, false, "");
        location[268] = new mazeTile(false, false, false, true, "");
        location[269] = new mazeTile(false, true, true, false, "");
        location[270] = new mazeTile(true, false, false, true, "");
        location[271] = new mazeTile(false, false, true, true, "");
        location[272] = new mazeTile(true, false, true, false, "");
        location[273] = new mazeTile(false, false, false, false, "");
        location[274] = new mazeTile(true, true, false, false, "");
        location[275] = new mazeTile(true, true, false, true, "");
        location[276] = new mazeTile(true, false, true, false, "");
        location[277] = new mazeTile(true, true, false, false, "");
        location[278] = new mazeTile(true, false, false, true, "");
        location[279] = new mazeTile(false, true, true, false, "");

        location[280] = new mazeTile(false, true, false, true, "");
        location[281] = new mazeTile(true, false, true, false, "");
        location[282] = new mazeTile(true, true, false, false, "");
        location[283] = new mazeTile(true, false, false, true, "");
        location[284] = new mazeTile(false, true, true, true, "");
        location[285] = new mazeTile(true, false, true, false, "");
        location[286] = new mazeTile(true, true, false, false, "");
        location[287] = new mazeTile(true, false, false, true, "");
        location[288] = new mazeTile(false, true, true, false, "");
        location[289] = new mazeTile(true, false, false, true, "");
        location[290] = new mazeTile(false, false, true, true, "");
        location[291] = new mazeTile(false, false, true, false, "");
        location[292] = new mazeTile(false, true, false, true, "");
        location[293] = new mazeTile(false, false, true, true, "");
        location[294] = new mazeTile(true, false, true, false, "");
        location[295] = new mazeTile(true, true, false, false, "");
        location[296] = new mazeTile(false, true, false, true, "");
        location[297] = new mazeTile(true, false, true, true, "");
        location[298] = new mazeTile(false, false, true, false, "");
        location[299] = new mazeTile(true, true, false, false, "");

        location[300] = new mazeTile(true, false, false, false, "");
        location[301] = new mazeTile(false, true, false, true, "");
        location[302] = new mazeTile(true, false, true, true, "");
        location[303] = new mazeTile(false, false, true, false, "");
        location[304] = new mazeTile(true, true, false, false, "");
        location[305] = new mazeTile(false, true, false, true, "");
        location[306] = new mazeTile(true, true, true, true, "");
        location[307] = new mazeTile(false, true, true, false, "");
        location[308] = new mazeTile(true, true, false, false, "");
        location[309] = new mazeTile(false, false, false, true, "");
        location[310] = new mazeTile(false, true, true, false, "");
        location[311] = new mazeTile(false, true, false, true, "");
        location[312] = new mazeTile(true, false, true, false, "");
        location[313] = new mazeTile(false, true, false, true, "");
        location[314] = new mazeTile(false, false, true, true, "");
        location[315] = new mazeTile(true, false, true, false, "");
        location[316] = new mazeTile(true, true, false, false, "");
        location[317] = new mazeTile(false, true, false, false, "");
        location[318] = new mazeTile(false, true, false, true, "");
        location[319] = new mazeTile(true, false, true, false, "");

        location[320] = new mazeTile(false, true, false, true, "");
        location[321] = new mazeTile(true, true, true, false, "");
        location[322] = new mazeTile(false, true, false, true, "");
        location[323] = new mazeTile(false, false, true, true, "");
        location[324] = new mazeTile(true, false, true, false, "");
        location[325] = new mazeTile(true, true, false, true, "");
        location[326] = new mazeTile(true, true, true, true, "");
        location[327] = new mazeTile(true, false, true, false, "");
        location[328] = new mazeTile(true, false, false, true, "");
        location[329] = new mazeTile(false, true, true, false, "");
        location[330] = new mazeTile(true, true, false, false, "");
        location[331] = new mazeTile(true, true, false, false, "");
        location[332] = new mazeTile(false, false, false, true, "");
        location[333] = new mazeTile(true, true, true, false, "");
        location[334] = new mazeTile(false, true, false, true, "");
        location[335] = new mazeTile(false, false, true, true, "");
        location[336] = new mazeTile(true, false, true, false, "");
        location[337] = new mazeTile(true, false, false, false, "");
        location[338] = new mazeTile(true, true, false, false, "");
        location[339] = new mazeTile(false, true, false, false, "");

        location[340] = new mazeTile(true, true, false, true, "");
        location[341] = new mazeTile(true, true, true, false, "");
        location[342] = new mazeTile(true, true, false, false, "");
        location[343] = new mazeTile(false, false, false, true, "");
        location[344] = new mazeTile(false, false, true, true, "");
        location[345] = new mazeTile(true, false, true, true, "");
        location[346] = new mazeTile(true, false, true, false, "");
        location[347] = new mazeTile(false, true, false, true, "");
        location[348] = new mazeTile(false, false, true, true, "");
        location[349] = new mazeTile(true, true, true, false, "");
        location[350] = new mazeTile(true, true, false, false, "");
        location[351] = new mazeTile(true, false, false, true, "");
        location[352] = new mazeTile(false, true, true, false, "");
        location[353] = new mazeTile(true, false, false, false, "");
        location[354] = new mazeTile(true, true, false, false, "");
        location[355] = new mazeTile(false, false, false, true, "");
        location[356] = new mazeTile(false, false, true, false, "");
        location[357] = new mazeTile(false, true, false, true, "");
        location[358] = new mazeTile(true, false, true, false, "");
        location[359] = new mazeTile(true, false, false, false, "");

        location[360] = new mazeTile(true, true, false, true, "");
        location[361] = new mazeTile(true, true, true, false, "");
        location[362] = new mazeTile(true, false, false, true, "");
        location[363] = new mazeTile(false, false, true, true, "");
        location[364] = new mazeTile(false, false, true, true, "");
        location[365] = new mazeTile(false, false, true, true, "");
        location[366] = new mazeTile(false, true, true, false, "");
        location[367] = new mazeTile(true, true, false, false, "");
        location[368] = new mazeTile(false, true, false, false, "");
        location[369] = new mazeTile(true, false, false, true, "");
        location[370] = new mazeTile(true, false, true, false, "");
        location[371] = new mazeTile(false, true, false, false, "");
        location[372] = new mazeTile(true, false, false, true, "");
        location[373] = new mazeTile(false, false, true, true, "");
        location[374] = new mazeTile(true, false, true, true, "");
        location[375] = new mazeTile(false, false, true, true, "");
        location[376] = new mazeTile(false, true, true, false, "");
        location[377] = new mazeTile(true, false, false, true, "");
        location[378] = new mazeTile(false, false, true, true, "");
        location[379] = new mazeTile(false, true, true, false, "");

        location[380] = new mazeTile(true, false, false, true, "");
        location[381] = new mazeTile(true, false, true, true, "");
        location[382] = new mazeTile(false, false, true, true, "");
        location[383] = new mazeTile(false, false, true, true, "");
        location[384] = new mazeTile(false, false, true, true, "");
        location[385] = new mazeTile(false, false, true, false, "");
        location[386] = new mazeTile(true, false, false, true, "");
        location[387] = new mazeTile(true, false, true, false, "");
        location[388] = new mazeTile(true, false, false, true, "");
        location[389] = new mazeTile(false, false, true, true, "");
        location[390] = new mazeTile(false, false, true, true, "");
        location[391] = new mazeTile(true, false, true, true, "");
        location[392] = new mazeTile(false, false, true, true, "");
        location[393] = new mazeTile(false, false, true, true, "");
        location[394] = new mazeTile(false, false, true, true, "");
        location[395] = new mazeTile(false, false, true, false, "");
        location[396] = new mazeTile(true, false, false, true, "");
        location[397] = new mazeTile(false, false, true, true, "");
        location[398] = new mazeTile(false, false, true, false, "");
        location[399] = new mazeTile(true, false, false, false, "End");
        console.log(location);
    }
}
