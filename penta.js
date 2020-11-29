const n = 25;
const m = 17;

const tileParts = {
    left: ['right3', 'top3', 'middle-ort', 'bottom3'],
    top: ['top1', 'left1', 'middle', 'right1'],
    bottom: ['left2', 'middle', 'right2', 'bottom2'],
    right: ['left4', 'top4', 'middle-ort2', 'bottom4'],
}

const moves = ['left', 'top', 'bottom', 'right']

const pentaMovesEven = {
    left: [[0, 0, 'top'], [0, 0, 'bottom'], [-1, 0, 'bottom'], [-1, 0, 'right'], [0, -1, 'right'], [1, 0, 'right'], [1, 0, 'top']],
    top: [[0, 0, 'bottom'], [0, 0, 'left'], [0, 0, 'right'], [-1, 0, 'right'], [-1, 0, 'bottom'], [-1, 1, 'left'], [-1, 1, 'bottom']],
    bottom: [[0, 0, 'top'], [0, 0, 'left'], [0, 0, 'right'], [1, 0, 'top'], [1, 0, 'right'], [1, 1, 'top'], [1, 1, 'left']],
    right: [[0, 0, 'top'], [0, 0, 'bottom'], [1, 1, 'top'], [1, 1, 'left'], [-1, 1, 'bottom'], [-1, 1, 'left'], [0, 1, 'left']],
}

const pentaMovesOdd = {
    left: [[0, 0, 'top'], [0, 0, 'bottom'], [-1, -1, 'bottom'], [-1, -1, 'right'], [0, -1, 'right'], [1, -1, 'top'], [1, -1, 'right']],
    top: [[0, 0, 'bottom'], [0, 0, 'left'], [0, 0, 'right'], [-1, -1, 'bottom'], [-1, -1, 'right'], [-1, 0, 'left'], [-1, 0, 'bottom']],
    bottom: [[0, 0, 'top'], [0, 0, 'left'], [0, 0, 'right'], [1, -1, 'top'], [1, -1, 'right'], [1, 0, 'left'], [1, 0, 'top']],
    right: [[0, 0, 'top'], [0, 0, 'bottom'], [-1, 0, 'left'], [-1, 0, 'bottom'], [0, 1, 'left'], [1, 0, 'top'], [1, 0, 'left']],
}

let started = false;
let timer;
let generationCount = 0;
let evolutionSpeed = 100;

let currGen = [n];
let nextGen = [n];

function setSpeed(val) {
    evolutionSpeed = 1000 - val;
}

function createGenArrays() {
    for (let i = 0; i < n; i++) {
        currGen[i] = new Array(m);
        nextGen[i] = new Array(m);
    }
}

function initGenArrays() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            currGen[i][j] = {left: 0, top: 0, bottom: 0, right: 0};
            nextGen[i][j] = {left: 0, top: 0, bottom: 0, right: 0};
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');

    for (let i = 0; i < n; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', (i % 2) ? 'penta-row even' : 'penta-row');

        for (let j = 0; j < m; j++) {
            let tile = document.createElement('div');
            tile.setAttribute('class', 'tile');

            setTiles = {}
            for (t in tileParts) {
                setTiles[t] = document.createElement('div')
                setTiles[t].setAttribute('class', 'penta ' + t + ' dead');
                setTiles[t].setAttribute('id', i + '_' + j + '_' + t);
                setTiles[t].addEventListener('click', cellClick);

                setSubTiles = {}
                for (s in tileParts[t]) {
                    setSubTiles[s] = document.createElement('div')
                    setSubTiles[s].setAttribute('class', tileParts[t][s]);
                    setTiles[t].appendChild(setSubTiles[s]);
                }

                tile.appendChild(setTiles[t]);
            }

            row.appendChild(tile);
        }
    world.appendChild(row);
    }
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
    let pos = loc[2];

    let existingClasses = this.className.split(" ").slice(0, -1).join(' ')
    if (this.className.includes('alive')){
        this.setAttribute('class', existingClasses + ' dead');
        currGen[row][col][pos] = 0;
    } else {
        this.setAttribute('class', existingClasses + ' alive');
        currGen[row][col][pos] = 1;
    }
}

function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            for (p in moves) {
                pos = moves[p]
                let neighbors = getNeighborCount(row, col, pos);
                // Using the 2,3/3,4,6
                if (neighbors == 2) {
                    nextGen[row][col][pos] = currGen[row][col][pos]
                } else if (neighbors == 3) {
                    nextGen[row][col][pos] = 1
                } else if (currGen[row][col][pos] == 0 && (neighbors == 4 || neighbors == 6)) {
                    nextGen[row][col][pos] = 1
                } else {
                    nextGen[row][col][pos] = 0
                }
            }
        }
    }
}

function getNeighborCount(row, col, pos) {
    let count = 0;
    let nrow = Number(row);
    let ncol = Number(col);
    let npos = pos;

    let i = 0;
    let j = 0;
    let q = '';


    for (p in pentaMovesEven[npos]) {
        if (nrow % 2) {
            i = pentaMovesEven[npos][p][0];
            j = pentaMovesEven[npos][p][1];
            q = pentaMovesEven[npos][p][2];
        } else {
            i = pentaMovesOdd[npos][p][0];
            j = pentaMovesOdd[npos][p][1];
            q = pentaMovesOdd[npos][p][2];
        }

        if ((nrow + i >= 0)  && (nrow + i < n) && (ncol + j >= 0)  && (ncol + j < m)) {
            count += currGen[nrow + i][ncol + j][q];
        }
    }
    return count;
}

function updateCurrGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = {left: 0, top: 0, bottom: 0, right: 0};
        }
    }
}

function updateWorld() {
    let cell = '';
    for (row in currGen) {
        for (col in currGen[row]) {
            for (p in moves) {
                cell = document.getElementById(row + '_' + col + '_' + moves[p]);
                let existingClasses = cell.className.split(" ").slice(0, -1).join(' ');

                if (currGen[row][col][moves[p]] == 0) {
                    cell.setAttribute('class', existingClasses + ' dead');
                } else {
                    cell.setAttribute('class', existingClasses + ' alive');
                }
            }
        }
    }
}


function evolve(){
    createNextGen();
    updateCurrGen();
    updateWorld();

    generationCount++;
    document.getElementById("generation").innerHTML = generationCount;

    if (started) {
        timer = setTimeout(evolve, evolutionSpeed);
    }
}

function startStopGol(){
    let startstop = document.querySelector('#btnstartstop');

    if (!started) {
       started = true;
       startstop.value='Stop Reproducing';
       evolve();

     } else {
        started = false;
        startstop.value='Start Reproducing';
        clearTimeout(timer);
    }
}

function resetWorld() {
    location.reload();
}

window.onload=()=>{
    createWorld();
    createGenArrays();
    initGenArrays();
}