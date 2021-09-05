"use strict";
//square factory will set up the square Objects
//stored single dimensional array on Board object
//square objects can have three states, "null", "X", "0", 
//will need method to update states 
// we will check for win by checking the states at each Square Object in the array
const squareFactory = (_id, _taken) => {
    let thisSquareTaken = () => _taken
    const thisSquareId = () => _id

    const updateTaken = function updateTaken(mark){
        _taken = mark
    }
    const drawhtmlSquares = function htmlSquares(){
        const newDiv = document.createElement('div')
        newDiv.classList.add('cell')
        newDiv.setAttribute('id', _id)
        const divContainer = document.getElementById('divContainer')
        divContainer.insertBefore(newDiv, null)
    }
    return {
        thisSquareTaken,
        thisSquareId,
        updateTaken,
        drawhtmlSquares
    }
}
//PLayer Factory will  assign player Objects X or O and name and active state = boolean
const playerFactory = (_name,_mark, _active) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;
    const getActive = () => _active

    return {
        getName,
        getMark,
        getActive
    }
}          
///Board Module will have three states "playing", "X's Win", "O win", "Tie"
// we will use these states to update the visual aspect of the game board 
//Board will create array of square objects
// let origBoard = Array.from(new Array(9).keys())
// console.log(origBoard)
const BoardModule = (() => {
    "use strict";
    let _boardState = null;
   
    function createSpaces() {
        let squares = [];
        for(let i = 0; i < 9; i++){
            let square = squareFactory(i, null)
            squares.push(square)
        }
        return squares
    };
    function drawHTMLBoard(i){
        for(let square of this.squares){
            square.drawhtmlSquares()
        }
    }
    function getBoardState(){
        return _boardState
    }
    function updateBoardState(state){
      _boardState = state;
      return _boardState
        
    }

        return {
            squares: createSpaces(),
            drawHTMLBoard,
            getBoardState,
            updateBoardState
        }
})()
console.log(BoardModule)
//Game Module 
//will handle create instance of board
//keep track of turn 
//making a omve on board 
//validate move
//identify winner  
const GameModule = (() => {

    function startGame(){
        let state = BoardModule.getBoardState()
        if(state === null){
            BoardModule.drawHTMLBoard()
            BoardModule.updateBoardState(true)
        } else {
            return
        }
    }

    return {
        startGame
    }
})()


