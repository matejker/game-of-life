const n = 15;
const m = 65;

const rhombusMovesEven = {
    top: [[0, 0, 'left'], [0, 0, 'right'], [0, 2, 'top'], [0, 2, 'left'], [0, -2, 'top'], [0, -2, 'right'], [0, -1, 'right'], [0, -1, 'left'], [0, 1, 'right'], [0, 1, 'left']],
    left: [[0, 0, 'top'], [0, 0, 'right'], [0, -2, 'right'], [0, -2, 'top'], [0, -1, 'left'], [0, -1, 'right'], [1, -1, 'right'], [1, -1, 'top'], [1, 1, 'left'], [1, 1, 'top']],
    right: [[0, 0, 'top'], [0, 0, 'left'], [0, 2, 'left'], [0, 2, 'top'], [0, 1, 'right'], [0, 1, 'left'], [1, 1, 'top'], [1, 1, 'left'], [1, -1, 'right'], [1, -1, 'top']],
}

const rhombusMovesOdd = {
    top: [[0, 0, 'left'], [0, 0, 'right'], [0, 2, 'top'], [0, 2, 'left'], [-1, -1, 'right'], [-1, -1, 'left'], [-1, 1, 'right'], [-1, 1, 'left'], [0, -2, 'right'], [0, -2, 'top']],
    left: [[0, 0, 'top'], [0, 0, 'right'], [0, -2, 'right'], [0, -2, 'top'], [-1, -1, 'right'], [-1, -1, 'left'], [0, -1, 'right'], [0, -1, 'top'], [0, 1, 'left'], [0, 1, 'top']],
    right: [[0, 0, 'top'], [0, 0, 'left'], [0, 1, 'top'], [0, 1, 'left'], [0, -1, 'right'], [0, -1, 'top'], [0, 2, 'left'], [0, 2, 'top'], [-1, 1, 'right'], [-1, 1, 'left']],
}

const moves = ['top', 'left', 'right']
const tileParts = {
    top: ['top', 'bottom'],
    left: ['top', 'middle', 'bottom'],
    right: ['top', 'middle', 'bottom']
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
            currGen[i][j] = {top: 0, left: 0, right: 0};
            nextGen[i][j] = {top: 0, left: 0, right: 0};
        }
    }
}

function randomInitGenArrays() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            currGen[i][j] = {top: Math.round(Math.random()), left: Math.round(Math.random()), right: Math.round(Math.random())};
            nextGen[i][j] = {top: Math.round(Math.random()), left: Math.round(Math.random()), right: Math.round(Math.random())};
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');

    for (let i = 0; i < n; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'hex-row');

        for (let j = 0; j < m; j++) {
            let hex = document.createElement('div');
            hex.setAttribute('class', (j % 2) ? 'hex even' : 'hex');

            setTiles = {}
            for (t in tileParts) {
                setTiles[t] = document.createElement('div')
                setTiles[t].setAttribute('class', 'rhombus ' + t + ' dead');
                setTiles[t].setAttribute('id', i + '_' + j + '_' + t);
                setTiles[t].addEventListener('click', cellClick);

                setSubTiles = {}
                for (s in tileParts[t]) {
                    setSubTiles[s] = document.createElement('div')
                    setSubTiles[s].setAttribute('class', tileParts[t][s]);
                    setTiles[t].appendChild(setSubTiles[s]);
                }

                hex.appendChild(setTiles[t]);
            }

            row.appendChild(hex);
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
                 // Using 3,5/2 rule
                if (neighbors == 2) {
                    nextGen[row][col][pos] = currGen[row][col][pos];
                } else if (neighbors == 3) {
                    nextGen[row][col][pos] = 1;
                } else {
                    nextGen[row][col][pos] = 0;
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

    for (p in rhombusMovesEven[npos]) {
        if (ncol % 2) {
            i = rhombusMovesEven[npos][p][0];
            j = rhombusMovesEven[npos][p][1];
            q = rhombusMovesEven[npos][p][2];
        } else {
            i = rhombusMovesOdd[npos][p][0];
            j = rhombusMovesOdd[npos][p][1];
            q = rhombusMovesOdd[npos][p][2];
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
            nextGen[row][col] = {top: 0, left: 0, right: 0};
        }
    }
}

function updateWorld() {
    let cell = '';
    for (row in currGen) {
        for (col in currGen[row]) {
            for (p in moves) {
                cell = document.getElementById(row + '_' + col + '_' + moves[p]);
                let existingClasses = cell.className.split(" ").slice(0, -1).join(' ')

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

function randomWorld() {
    randomInitGenArrays();
    updateWorld();
}

window.onload=()=>{
    createWorld();
    createGenArrays();
    initGenArrays();
}
