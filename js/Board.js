"use strict";

//square factory will set up the square Objects
//stored single dimensional array on Board object
//square objects can have three states, "null", "X", "0", 
//will need method to update states 
// we will check for win by checking the states at each Square Object in the array
const squareFactory = (_id, _taken) => {
    let thisSquareTaken = () => _taken
    const thisSqaureId = () => _id

    const getSquareTaken = function getSquareTaken(){
        return _taken
    }

    const getSquareId = function getSquareId(){
        return _id
    }

    const updateTaken = function updateTaken(mark){
        _taken = mark
    }
    return {
        getSquareTaken,
        getSquareId,
        updateTaken,
    }
}


//PLayer Factory will  assign player Objects X or O and name and active state = boolean
const playerFactory = (_name,_mark, _active) => {
    'use strict';
    const getName = () => _name;
    const getMark = () => _mark;
    const getActive = () => _active

 
    const isActive = function isActive(){
        return _active
    }
 
    const  playerMark = function myMArk(){
        return _mark
    }
    const sayName = function sayName(){
        return _name
    } 
    return {
        isActive,
        playerMark,
        sayName
    }
}                  


const player1 = playerFactory("jeff", "X", true)
const player2 = playerFactory("Bob", "O", false)



// const counterCreator = () => {
//     let count = 0;
//     return () => {
//       console.log(count);
//       count++;
//     };
//   };



///Board Module will have three states "playing", "X's Win", "O win", "Tie"
// we will use these states to update the visual aspect of the game board 
//Board will create array of square objects
// let origBoard = Array.from(new Array(9).keys())
// console.log(origBoard)






//Game Module 
//will handle create instance of board
//keep track of turn 
//making a omve on board 
//validate move
//identify winner  



