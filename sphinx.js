const n = 44;
const m = 64;

let started = false;
let timer;
let generationCount = 0;
let evolutionSpeed = 100;

let currGen = [n];
let nextGen = [n];


const baseMoves = [[0, 1], [0, 2], [0, -1], [0, -2], [1, 0], [-1, 0]]
const sphinxMovesZero = {
    top: [[-1, -1], [-1, -2], [-1, -3], [-1, 1], [1, 1], [1, 2]],
    bottom: [[-1, -1], [1, 1], [1, -1], [1, -2], [1, 2], [1, 3], [-1, -2]]
}
const sphinxMovesOne = {
    top: [[-1, -1], [-1, -2], [-1, -3], [-1, 1], [1, -2], [1, -1]],
    bottom: [[1, -1], [1, 1], [1, -2], [1, -3], [-1, -1], [-1, -2]]
}
const sphinxMovesTwo = {
    top: [[-1, 1], [-1, -1], [-1, 2], [-1, 3], [1, 2], [1, 1]],
    bottom: [[1, 1], [1, -1], [1, 3], [-1, 1], [-1, 2], [1, 2]]
}


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
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function randomInitGenArrays() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            currGen[i][j] = Math.round(Math.random());
            nextGen[i][j] = Math.round(Math.random());
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');

    for (let i = 0; i < n; i++) {
        let row = document.createElement('div');
        switch (i % 3) {
            case 0:
            row.setAttribute('class', 'row');
            break;
            case 1:
            row.setAttribute('class', 'row one');
            break;
            case 2:
            row.setAttribute('class', 'row two');
            break;

        }

        for (let j = 0; j < m; j++) {
            let sphinx = document.createElement('div');
            sphinx.setAttribute('class', (j % 2 == 0) ? 'sphinx b dead' : 'sphinx t dead');
            sphinx.setAttribute('id', i + '_' + j);
            sphinx.addEventListener('click', cellClick);

            let block = document.createElement('div');
            block.setAttribute('class', 'block');

            if (j % 2 == 0) {
                let top = document.createElement('div');
                top.setAttribute('class', 'top');

                let bottom = document.createElement('div');
                bottom.setAttribute('class', 'bottom');

                let left = document.createElement('div');
                left.setAttribute('class', 'left');

                let right = document.createElement('div');
                right.setAttribute('class', 'right');

                top.appendChild(left);
                top.appendChild(right);
                sphinx.appendChild(top);

                left = document.createElement('div');
                left.setAttribute('class', 'left');

                right = document.createElement('div');
                right.setAttribute('class', 'right');

                bottom.appendChild(left);
                bottom.appendChild(block);
                bottom.appendChild(right);
                sphinx.appendChild(bottom);
            } else {
                let top = document.createElement('div');
                top.setAttribute('class', 'top');

                let bottom = document.createElement('div');
                bottom.setAttribute('class', 'bottom');

                let ileft = document.createElement('div');
                ileft.setAttribute('class', 'ileft');

                let iright = document.createElement('div');
                iright.setAttribute('class', 'iright');

                top.appendChild(ileft);
                top.appendChild(block);
                top.appendChild(iright);
                sphinx.appendChild(top);

                ileft = document.createElement('div');
                ileft.setAttribute('class', 'ileft');

                iright = document.createElement('div');
                iright.setAttribute('class', 'iright');

                bottom.appendChild(ileft);
                bottom.appendChild(iright);
                sphinx.appendChild(bottom);
            }

            row.appendChild(sphinx);
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
             // Using 2,3/3 rule
            if (neighbors == 2) {
                nextGen[row][col] = currGen[row][col];
            } else if (neighbors == 3) {
                nextGen[row][col] = 1;
            } else {
                nextGen[row][col] = 0;
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
    let moves = baseMoves;

    switch (nrow % 3) {
        case 0:
        moves.concat((ncol % 2) ? sphinxMovesZero.top : sphinxMovesZero.bottom);
        break;
        case 1:
        moves.concat((ncol % 2) ? sphinxMovesOne.top : sphinxMovesOne.bottom);
        break;
        case 2:
        moves.concat((ncol % 2) ? sphinxMovesTwo.top : sphinxMovesTwo.bottom);
        break;
    }

     for (p in moves) {
        i = moves[p][0];
        j = moves[p][1];
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

function randomWorld() {
    randomInitGenArrays();
    updateWorld();
}
