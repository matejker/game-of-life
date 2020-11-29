const n = 40;
const m = 80;
const perm = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];

let started = false;
let timer;
let generationCount = 0;
let evolutionSpeed = 100;
console.log(evolutionSpeed);

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
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');
    let tbl = document.createElement('table');
    tbl.setAttribute('id', 'worldgrid');

    for (let i = 0; i < n; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < m; j++) {
            let cell = document.createElement('td');

            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click', cellClick);

            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);

    if (this.className === 'alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    } else {
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}

function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            let neighbors = getNeighborCount(row, col);

            if (neighbors == 2) {
                nextGen[row][col] = currGen[row][col]
            } else if (neighbors == 3) {
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

    for (p in perm) {
        i = perm[p][0]
        j = perm[p][1]

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
            if (currGen[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
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
