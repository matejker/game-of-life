const n = 10;
const m = 7;

const tileParts = {
    left: ['right3', 'top3', 'middle-ort', 'bottom3'],
    top: ['top1', 'left1', 'middle', 'right1'],
    bottom: ['left2', 'middle', 'right2', 'bottom2'],
    right: ['left4', 'top4', 'middle-ort2', 'bottom4'],
}


let started = false;
let timer;
let generationCount = 0;
let evolutionSpeed = 100;

let currGen = [n];
let nextGen = [n];

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

    let existingClasses = this.className.split(" ").slice(0, -1).join(' ')
    if (this.className.includes('alive')){
        this.setAttribute('class', existingClasses + ' dead');
//        currGen[row][col] = 0;
    } else {
        this.setAttribute('class', existingClasses + ' alive');
//        currGen[row][col] = 1;
    }
}

window.onload=()=>{
    createWorld();
}