# Game of Life in Hexagonal, Pentagonal and Other Tessellations 
> That game of life is hard to play  
I'm gonna lose it anyway  
The losing card I'll someday lay  
So this is all I have to say  

~ M.A.S.H

Started to read [The Recursive Universe [1]](https://www.amazon.co.uk/Recursive-Universe-Complexity-Scientific-Knowledge/dp/048649098X), 
once again, I got amazed by this Conway's _toy_. I tried to make _just another implementation_ of Conway's Game of Life, with
a decent _copypasta_ from Rob Tomlin's tutorial [2] and fair algorithm and code optimization. Real fun starts when you
try it on various tile shapes (squares, triangles, hexagons, pentagons,...)

## Rules
> millions of dollars in valuable computer time may have already been wasted by the game's growing horde of fanatics

~ Time 1974  

Carter Bays [4] stated a notation for game rules with values `E1, E2,../F1, F2,..` of _environment_ and _fertility_ rates.
The original Conway's rules for squares are `2,3/3`, which means cells with 2 or 3 neighbors preserve in the same state, 
while if a dead cell has 3 neighbors, cell will live in next generations.

>We call a game of life (GL) rule if it satisfies the criteria below.
>1. When counting the neighbors of a cell, all touching neighbors are considered and treated the same.
>2. At least one glider exists. (_An oscillator that translates is called a glider._)
>3. Start with a finite wrapped universe that is completely filled with a random pattern. Then after a finite number of 
generations, all such patterns eventually must either disappear, or decompose into one or more oscillators. 
Rules exhibiting this property are said to be stable. [4]


### Orthogonal - the original [[Live demo](https://matejker.github.io/game-of-life/life.html)]
The original Conway's rules [1] (`2,3/3`, [4]) are, if for a given cell:
1. the number of live neighbours is exactly 2, the cell maintains its status quo into the next generation; `(0 -> 0)`, `(1 -> 1)`
2. the number of live neighbours is exactly 3, the cell will live in the next generation; `(0 -> 1)`, `(1 -> 1)`
3. the number of live neighbours is 1, 4,..., the cell won't live in the next generation; `(0 -> 0)`, `(1 -> 0)`

[Live demo](https://matejker.github.io/game-of-life/life.html) of _regular_ Game of life.

### Hexagonal [[Live demo](https://matejker.github.io/game-of-life/hexagonal.html)]
The game of life on hexagons is bit different as each cell has six neighbors. In order to preserve existence of gliders,
the rule `3,5/2` satisfies all three criteria [4], 
if for a given cell:  
1. the number of live neighbours is exactly 2 and the cell lives, the cell will live in the next generation; `(0 -> 1)`, `(1 -> 0)`  
2. the number of live neighbours is 3 or 5, the cell maintains its status quo into the next generation ; `(0 -> 0)`, `(1 -> 1)`
3. otherwise, the cell won't live in the next generation; `(0 -> 0)`, `(1 -> 0)`

[Live demo](https://matejker.github.io/game-of-life/hexagonal.html) of _hexagonal_ Game of life. 

### Pentagonal [[Live demo](https://matejker.github.io/game-of-life/pentagonal.html)]
Each cell on the "Cairo tiling" pentagonal tessellation has seven neighbors, which is nice as it is between _orthogonal_
and _hexagonal_ variants. A rule `2,3/3,4,6` seems to be the only rule satisfies all criteria [4], 
if for a given cell:  
1. the number of live neighbours is exactly 3, 4, 6 and the cell lives, the cell will live in the next generation; `(0 -> 1)`, `(1 -> 0)`  
2. the number of live neighbours is 2 or 3, the cell maintains its status quo into the next generation ; `(0 -> 0)`, `(1 -> 1)`
3. otherwise, the cell won't live in the next generation; `(0 -> 0)`, `(1 -> 0)`

[Live demo](https://matejker.github.io/game-of-life/pentagonal.html) of _pentagonal_ Game of life on _Cairo tiling_. 

![](./docs/glider/shrimp.png)  
A :fried_shrimp: example of pentagonal _glider_ on `2,3/3,4,6`, it has period 48 and moves 6 units up.


### Rhomboidal [[Live demo](https://matejker.github.io/game-of-life/rhombille.html)]
Rhomboidal tiling is formed by dividing each hexagon in regular hexagonal tilings into 3 regular rhombi [8]. Such grid 
has high connectivity as each rhombus has 10 neighbours, which is called _Q*bert neighborhood_ [8]. We can use the original `2,3/3` rule as in orthogonal grid.

Interestingly, we can find plenty of _still lifes_ and _infinite growth_ generators, but very little of gilders and 
oscillators. On a picture below, we can see a small fraction of _still lifes_.
![](./rhomboidal.png)   

[Live demo](https://matejker.github.io/game-of-life/rhombille.html) of _Rhomboidal_ Game of Life :diamonds:.

### Advent of Code 2020 - Seating System [[Part 1](https://matejker.github.io/game-of-life/aoc.html)], [[Part 2](https://matejker.github.io/game-of-life/aoc2.html)]
A variation of _Cellular Automata_ was used as a puzzle in [Advent of Code 2020 on Day 13](https://adventofcode.com/2020/day/11).
The idea was to simulate occupation of seats in waiting area as more and more people arrive, with given rules:

> Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the 
number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or 
diagonal from the seat). The following rules are applied to every seat simultaneously: 
> - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
> - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
> - Otherwise, the seat's state does not change.  
> Floor (.) never changes; seats don't move, and nobody sits on the floor. [6]

Here is a live demo for my puzzle: [Part 1](https://matejker.github.io/game-of-life/aoc.html), 
[Part 2](https://matejker.github.io/game-of-life/aoc.html)

## Usage
Feel more that free to use, modify and copy the code, just follow the [licence](./LICENSE.txt) and cite it:

```tex
@misc{Kerekrety2020,
  author = {Kerekrety, M},
  title = {Game of Life in Hexagonal, Pentagonal and Other Tessellations},
  year = {2020},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/matejker/game-of-life}}
}
```

## References
[1] William Poundstone (1985), _The Recursive Universe_, NTC Publishing Group ISBN:978-0-8092-5202-2

[2] Rob Tomlin (2020), _The Game of Life Using JavaScript_,  
https://medium.com/javascript-in-plain-english/the-game-of-life-using-javascript-fc1aaec8274f

[3] James Tauber (?), _CSS Hexagon Tutorial._ https://jtauber.github.io/articles/css-hexagon.html  

[4] Carter Bays (2005) _A Note on the Game of Life in Hexagonal and Pentagonal Tessellations._ 
https://content.wolfram.com/uploads/sites/13/2018/02/15-3-4.pdf

[5] Teruhisa Sugimoto, Tohru Ogawa (2000), _Tiling Problem of Convex Pentagon._
https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.106.1383&rep=rep1&type=pdf

[6] Eric Wastl (2020), _Advent of Code 2020_, https://adventofcode.com/2020  

[7] Peter Taylor (2014), _Implement the Game of Life on Anything but a Regular Grid > Rhombille_, https://codegolf.stackexchange.com/a/36176

[8] Wikimedia (?), _Rhombille tiling_, https://en.wikipedia.org/wiki/Rhombille_tiling