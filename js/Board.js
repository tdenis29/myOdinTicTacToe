"use strict";
//square Factory
const squareFactory = (x,y, id =`space-${x}-${y}`, taken = null) => {
        function htmlSquares(){
        const newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        newDiv.setAttribute('id', this.id)
        const divContainer = document.getElementById('divContainer');
        divContainer.insertBefore(newDiv, null);
    }
    return {x,y,id ,taken, htmlSquares}
}
//player Factory
const Player = (_name,_mark, _active) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;
    const isActive = () => _active
    

    return { getName, getMark, isActive }
};


//Board Module will create a 2d array of new square objects
//module pattern
const BoardModule = (() => {
    'use strict';
   
    //private _rows var
    let _rows = 3;
    //private _columns var
    let _columns = 3;

    //public method using private varibales?
    const spacesArray = function createSpaces() {
        let spaces = [];
        for(let x=0; x < _columns; x++){
            const column = [];
            for(let y=0; y < _rows; y++){
                let space = squareFactory(x,y)
                column.push(space);
               
            }
            spaces.push(column);
        }
        return spaces
    };

    function drawHTMLBoard() {
        for(let column of spacesArray()){
            for(let space of column){
                space.htmlSquares();
            }
        }
   }

    return {

        drawHTMLBoard, spacesArray

    }

})();

const GameModule = (() => {
    "use strict";
    //create instance of board 
    const spacesArray = BoardModule.spacesArray();
    let newBoard = BoardModule.drawHTMLBoard()
    //create instance of players
    const player1 = Player("player1", "X", false)
    //move
    //validate move
    //checkwin
        return {
            newBoard,
       
            player1,

            spacesArray
        }

})();
console.log(GameModule.spacesArray[0][1])















//notes
// class Board {
//     constructor(){
//         this.rows = 3;
//         this.columns = 3;
//         this.spaces = this.createSpaces();
//     }
//     createSpaces(){
//         let spaces = [];
//         for(let x=0; x < this.columns; x++){
//             const column = [];
//             for(let y=0; y < this.rows; y++){
//                 let space = squareFactory(x,y)
//                 column.push(space);
//                 // const newDiv = document.createElement('div');
//                 // newDiv.classList.add('cell');
//                 // const divContainer = document.getElementById('divContainer');
//                 // divContainer.insertBefore(newDiv, null);
//             }
//             spaces.push(column);
//         }
        
//         return spaces
//     }
// }
// const board = new Board();

// const Player = (name, level) => {
//     let health = level * 2;
//     const getLevel = () => level;
//     const getName  = () => name;
//     const die = () => {
//       // uh oh
//     };


// const calculator = (() => {
//     const add = (a, b) => a + b;
//     const sub = (a, b) => a - b;
//     const mul = (a, b) => a * b;
//     const div = (a, b) => a / b;
//     return {
//       add,
//       sub,
//       mul,
//       div,
//     };
//   })();