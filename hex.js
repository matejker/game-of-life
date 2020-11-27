const n = 25;
const m = 45;

// Even row
//         (-1, 0)
// (0, -1) /  |  \ (0, 1)
// (1, -1) \  |  / (1, 1)
//          (1, 0)
const evenPerm = [[0, -1], [-1, 0], [0, 1], [1, -1], [1, 0], [1, 1]];

// Odd row
//         (-1, -0)
// (-1, -1) /  |  \ (-1, 1)
//  (0, -1) \  |  /  (0, 1)
//           (1, 0)
const oddPerm = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [1, 0], [0, 1]];

let started = false;
let timer;
let generationCount = 0;
let evolutionSpeed = 100;

let currGen = [n];
let nextGen = [n];


function createGenArrays() {
    for (let i = 0; i < n; i++) {
        currGen[i] = new Array(m);
        nextGen[i] = new Array(m);
    }
}

function initGenArrays() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
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
            hex.setAttribute('class', (j % 2) ? 'hex even dead' : 'hex dead');
            hex.setAttribute('id', i + '_' + j);
            hex.addEventListener('click', cellClick);

            let left = document.createElement('div');
            left.setAttribute('class', 'left');
            let middle = document.createElement('div');
            middle.setAttribute('class', 'middle');
            let right = document.createElement('div');
            right.setAttribute('class', 'right');

            hex.appendChild(left);
            hex.appendChild(middle);
            hex.appendChild(right);

            row.appendChild(hex);
        }
    world.appendChild(row);
    }
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);

    let existingClasses = this.className.split(" ").slice(0, -1).join(' ')
    if (this.className.includes('alive')){
        this.setAttribute('class', existingClasses + ' dead');
        currGen[row][col] = 0;
    } else {
        this.setAttribute('class', existingClasses + ' alive');
        currGen[row][col] = 1;
    }
}

function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            let neighbors = getNeighborCount(row, col);

            if (neighbors == 2) {
                nextGen[row][col] = 1
            } else {
                nextGen[row][col] = 0
            }
        }
    }
}

function getNeighborCount(row, col) {
    let count = 0;
    let nrow = Number(row);
    let ncol = Number(col);

    let i = 0;
    let j = 0;

    for (let p = 0; p < 6; p++) {
        if (ncol % 2) {
            i = evenPerm[p][0]
            j = evenPerm[p][1]
        } else {
            i = oddPerm[p][0]
            j = oddPerm[p][1]
        }

        if ((nrow + i >= 0)  && (nrow + i < n) && (ncol + j >= 0)  && (ncol + j < m)) {
            count += currGen[nrow + i][ncol + j];
        }
    }
    return count;
}

function updateCurrGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = 0;
        }
    }
}

function updateWorld() {
    let cell = '';
    for (row in currGen) {
        for (col in currGen[row]) {
            cell = document.getElementById(row + '_' + col);
            let existingClasses = cell.className.split(" ").slice(0, -1).join(' ')

            if (currGen[row][col] == 0) {
                cell.setAttribute('class', existingClasses + ' dead');
            } else {
                cell.setAttribute('class', existingClasses + ' alive');
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
