# Game of Life
> That game of life is hard to play  
I'm gonna lose it anyway  
The losing card I'll someday lay  
So this is all I have to say  

~ M.A.S.H

Started to read [The Recursive Universe [1]](https://www.amazon.co.uk/Recursive-Universe-Complexity-Scientific-Knowledge/dp/048649098X), 
once again, I got amazed by this Conway's _toy_. I tried to make _just another implementation_ of Conway's Game of Life, with
a decent _copypasta_ from Rob Tomlin's tutorial [2] and fair algorithm and code optimization. Real fun starts when you
try it on various tile shapes (squares, triangles, hexagons, pentagons,...)

## Algorithms
> millions of dollars in valuable computer time may have already been wasted by the game's growing horde of fanatics

~ Time 1974  

### Squares - the original
The original Conway's rules [1] are, if for a given cell:
1. the number of live neighbours is exactly 2, the cell maintains its status quo into the next generation; `(0 -> 0)`, `(1 -> 1)`
2. the number of live neighbours is exactly 3, the cell will live in the next generation; `(0 -> 1)`, `(1 -> 1)`
3. the number of live neighbours is 1, 4,..., the cell won't live in the next generation; `(0 -> 0)`, `(1 -> 0)`

### Hexagons
The game of life on hexagons is bit different as each cell has six neighbors, therefore, the rules are [4], 
if for a given cell:  
2. the number of live neighbours is exactly 2, the cell will live in the next generation; `(0 -> 1)`, `(1 -> 1)`  
3. the number of live neighbours is 1, 3,..., the cell won't live in the next generation; `(0 -> 0)`, `(1 -> 0)`  

## References
[1] William Poundstone (1985), _The Recursive Universe_, NTC Publishing Group ISBN:978-0-8092-5202-2

[2] Rob Tomlin (2020), _The Game of Life Using JavaScript_,  
https://medium.com/javascript-in-plain-english/the-game-of-life-using-javascript-fc1aaec8274f

[3] James Tauber (?), _CSS Hexagon Tutorial._ https://jtauber.github.io/articles/css-hexagon.html  

[4] Carter Bays, (2005) _A Note on the Game of Life in Hexagonal and Pentagonal Tessellations._ https://content.wolfram.com/uploads/sites/13/2018/02/15-3-4.pdf
